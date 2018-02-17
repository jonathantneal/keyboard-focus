export default function keyboardFocus(document) {
	let hadKeyboardEvent = true;
	let hadFocusVisibleRecently = false;
	let hadFocusVisibleRecentlyTimeout = null;

	/**
	 * On `keydown`, set `hadKeyboardEvent`.
	 * @param {Event} event
	 */
	function onKeyDown(event) {
		// Ignore keypresses if the user is holding down a modifier key.
		if (!event.altKey && !event.ctrlKey && !event.metaKey) {
			hadKeyboardEvent = true;
		}
	}

	/**
	 * If at any point a user clicks with a pointing device, ensure that we change
	 * the modality away from keyboard.
	 */
	function onPointerDown() {
		hadKeyboardEvent = false;
	}

	/**
	 * On `focus`, add the `keyboard-focus` attribute to the target if the
	 * target received focus as a result of keyboard navigation
	 * @param {Event} event
	 */
	function onFocus(event) {
		// Prevent IE from focusing the document or HTML element.
		if (event.target !== document && event.target.nodeName !== 'HTML' && hadKeyboardEvent) {
			event.target.setAttribute('keyboard-focus', '');

			hadKeyboardEvent = false;
		}
	}

	/**
	 * On `blur`, remove the `keyboard-focus` attribute from the target.
	 * @param {Event} event
	 */
	function onBlur(event) {
		if (event.target === document || event.target.nodeName === 'HTML') {
			return;
		}

		if (event.target.hasAttribute('keyboard-focus')) {
			// To detect a tab/window switch, we look for a blur event followed
			// rapidly by a visibility change.
			// If we don't see a visibility change within 100ms, it's probably
			// a regular focus change.
			hadFocusVisibleRecently = true;

			clearTimeout(hadFocusVisibleRecentlyTimeout);

			hadFocusVisibleRecentlyTimeout = setTimeout(function() {
				hadFocusVisibleRecently = false;

				clearTimeout(hadFocusVisibleRecentlyTimeout);
			}, 100);

			event.target.removeAttribute('keyboard-focus');
		}
	}

	/**
	 * If the user changes tabs, keep track of whether or not keyboard had
	 * recently triggered focus.
	 */
	function onVisibilityChange() {
		if (document.visibilityState === 'hidden') {
			// If the tab becomes active again, the browser will handle calling
			// focus on the element (Safari actually calls it twice).
			// If this tab change caused a blur, re-enable keyboard focus
			if (hadFocusVisibleRecently) {
				hadKeyboardEvent = true;
			}

			addInitialPointerMoveListeners();
		}
	}

	/**
	 * Add a group of listeners to detect usage of any pointing devices.
	 * These listeners will be added when the polyfill first loads, and anytime
	 * the window is blurred, so that they are active when the window regains
	 * focus.
	 */
	function addInitialPointerMoveListeners() {
		document.addEventListener('mousemove', onInitialPointerMove);
		document.addEventListener('mousedown', onInitialPointerMove);
		document.addEventListener('mouseup', onInitialPointerMove);
		document.addEventListener('pointermove', onInitialPointerMove);
		document.addEventListener('pointerdown', onInitialPointerMove);
		document.addEventListener('pointerup', onInitialPointerMove);
		document.addEventListener('touchmove', onInitialPointerMove);
		document.addEventListener('touchstart', onInitialPointerMove);
		document.addEventListener('touchend', onInitialPointerMove);
	}

	function removeInitialPointerMoveListeners() {
		document.removeEventListener('mousemove', onInitialPointerMove);
		document.removeEventListener('mousedown', onInitialPointerMove);
		document.removeEventListener('mouseup', onInitialPointerMove);
		document.removeEventListener('pointermove', onInitialPointerMove);
		document.removeEventListener('pointerdown', onInitialPointerMove);
		document.removeEventListener('pointerup', onInitialPointerMove);
		document.removeEventListener('touchmove', onInitialPointerMove);
		document.removeEventListener('touchstart', onInitialPointerMove);
		document.removeEventListener('touchend', onInitialPointerMove);
	}

	/**
	 * When the library first loads, assume the user is in keyboard modality.
	 * If any event is received from a pointing device (e.g. mouse, pointer,
	 * touch), turn off keyboard modality.
	 * This accounts for situations where focus enters the page from the URL bar.
	 * @param {Event} event
	 */
	function onInitialPointerMove(event) {
		// Work around a Safari quirk that fires a mousemove on <html> whenever the
		// window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
		if (event.target.nodeName !== 'HTML') {
			hadKeyboardEvent = false;

			removeInitialPointerMoveListeners();
		}
	}

	/**
	 * Subscription when the DOM is ready
	 */
	function initialize() {
		document.addEventListener('keydown', onKeyDown, true);
		document.addEventListener('mousedown', onPointerDown, true);
		document.addEventListener('pointerdown', onPointerDown, true);
		document.addEventListener('touchstart', onPointerDown, true);
		document.addEventListener('focus', onFocus, true);
		document.addEventListener('blur', onBlur, true);
		document.addEventListener('visibilitychange', onVisibilityChange, true);

		addInitialPointerMoveListeners();
	}

	/**
	 * Callback wrapper for check loaded state
	 */
	/* eslint-disable */
	!function load() {
		if (/m/.test(document.readyState)) {
			document.removeEventListener('readystatechange', load) | initialize();
		} else {
			document.addEventListener('readystatechange', load);
		}
	}()
	/* eslint-enable */
}
