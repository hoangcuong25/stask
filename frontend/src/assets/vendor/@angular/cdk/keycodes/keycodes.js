/* esm-bundle - @angular/cdk/keycodes - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register([], (function (exports) {
    'use strict';
    return {
        execute: (function () {

            exports("hasModifierKey", hasModifierKey);

            const MAC_ENTER = exports("MAC_ENTER", 3);
            const BACKSPACE = exports("BACKSPACE", 8);
            const TAB = exports("TAB", 9);
            const NUM_CENTER = exports("NUM_CENTER", 12);
            const ENTER = exports("ENTER", 13);
            const SHIFT = exports("SHIFT", 16);
            const CONTROL = exports("CONTROL", 17);
            const ALT = exports("ALT", 18);
            const PAUSE = exports("PAUSE", 19);
            const CAPS_LOCK = exports("CAPS_LOCK", 20);
            const ESCAPE = exports("ESCAPE", 27);
            const SPACE = exports("SPACE", 32);
            const PAGE_UP = exports("PAGE_UP", 33);
            const PAGE_DOWN = exports("PAGE_DOWN", 34);
            const END = exports("END", 35);
            const HOME = exports("HOME", 36);
            const LEFT_ARROW = exports("LEFT_ARROW", 37);
            const UP_ARROW = exports("UP_ARROW", 38);
            const RIGHT_ARROW = exports("RIGHT_ARROW", 39);
            const DOWN_ARROW = exports("DOWN_ARROW", 40);
            const PLUS_SIGN = exports("PLUS_SIGN", 43);
            const PRINT_SCREEN = exports("PRINT_SCREEN", 44);
            const INSERT = exports("INSERT", 45);
            const DELETE = exports("DELETE", 46);
            const ZERO = exports("ZERO", 48);
            const ONE = exports("ONE", 49);
            const TWO = exports("TWO", 50);
            const THREE = exports("THREE", 51);
            const FOUR = exports("FOUR", 52);
            const FIVE = exports("FIVE", 53);
            const SIX = exports("SIX", 54);
            const SEVEN = exports("SEVEN", 55);
            const EIGHT = exports("EIGHT", 56);
            const NINE = exports("NINE", 57);
            const FF_SEMICOLON = exports("FF_SEMICOLON", 59); // Firefox (Gecko) fires this for semicolon instead of 186
            const FF_EQUALS = exports("FF_EQUALS", 61); // Firefox (Gecko) fires this for equals instead of 187
            const QUESTION_MARK = exports("QUESTION_MARK", 63);
            const AT_SIGN = exports("AT_SIGN", 64);
            const A = exports("A", 65);
            const B = exports("B", 66);
            const C = exports("C", 67);
            const D = exports("D", 68);
            const E = exports("E", 69);
            const F = exports("F", 70);
            const G = exports("G", 71);
            const H = exports("H", 72);
            const I = exports("I", 73);
            const J = exports("J", 74);
            const K = exports("K", 75);
            const L = exports("L", 76);
            const M = exports("M", 77);
            const N = exports("N", 78);
            const O = exports("O", 79);
            const P = exports("P", 80);
            const Q = exports("Q", 81);
            const R = exports("R", 82);
            const S = exports("S", 83);
            const T = exports("T", 84);
            const U = exports("U", 85);
            const V = exports("V", 86);
            const W = exports("W", 87);
            const X = exports("X", 88);
            const Y = exports("Y", 89);
            const Z = exports("Z", 90);
            const META = exports("META", 91); // WIN_KEY_LEFT
            const MAC_WK_CMD_LEFT = exports("MAC_WK_CMD_LEFT", 91);
            const MAC_WK_CMD_RIGHT = exports("MAC_WK_CMD_RIGHT", 93);
            const CONTEXT_MENU = exports("CONTEXT_MENU", 93);
            const NUMPAD_ZERO = exports("NUMPAD_ZERO", 96);
            const NUMPAD_ONE = exports("NUMPAD_ONE", 97);
            const NUMPAD_TWO = exports("NUMPAD_TWO", 98);
            const NUMPAD_THREE = exports("NUMPAD_THREE", 99);
            const NUMPAD_FOUR = exports("NUMPAD_FOUR", 100);
            const NUMPAD_FIVE = exports("NUMPAD_FIVE", 101);
            const NUMPAD_SIX = exports("NUMPAD_SIX", 102);
            const NUMPAD_SEVEN = exports("NUMPAD_SEVEN", 103);
            const NUMPAD_EIGHT = exports("NUMPAD_EIGHT", 104);
            const NUMPAD_NINE = exports("NUMPAD_NINE", 105);
            const NUMPAD_MULTIPLY = exports("NUMPAD_MULTIPLY", 106);
            const NUMPAD_PLUS = exports("NUMPAD_PLUS", 107);
            const NUMPAD_MINUS = exports("NUMPAD_MINUS", 109);
            const NUMPAD_PERIOD = exports("NUMPAD_PERIOD", 110);
            const NUMPAD_DIVIDE = exports("NUMPAD_DIVIDE", 111);
            const F1 = exports("F1", 112);
            const F2 = exports("F2", 113);
            const F3 = exports("F3", 114);
            const F4 = exports("F4", 115);
            const F5 = exports("F5", 116);
            const F6 = exports("F6", 117);
            const F7 = exports("F7", 118);
            const F8 = exports("F8", 119);
            const F9 = exports("F9", 120);
            const F10 = exports("F10", 121);
            const F11 = exports("F11", 122);
            const F12 = exports("F12", 123);
            const NUM_LOCK = exports("NUM_LOCK", 144);
            const SCROLL_LOCK = exports("SCROLL_LOCK", 145);
            const FIRST_MEDIA = exports("FIRST_MEDIA", 166);
            const FF_MINUS = exports("FF_MINUS", 173);
            const MUTE = exports("MUTE", 173); // Firefox (Gecko) fires 181 for MUTE
            const VOLUME_DOWN = exports("VOLUME_DOWN", 174); // Firefox (Gecko) fires 182 for VOLUME_DOWN
            const VOLUME_UP = exports("VOLUME_UP", 175); // Firefox (Gecko) fires 183 for VOLUME_UP
            const FF_MUTE = exports("FF_MUTE", 181);
            const FF_VOLUME_DOWN = exports("FF_VOLUME_DOWN", 182);
            const LAST_MEDIA = exports("LAST_MEDIA", 183);
            const FF_VOLUME_UP = exports("FF_VOLUME_UP", 183);
            const SEMICOLON = exports("SEMICOLON", 186); // Firefox (Gecko) fires 59 for SEMICOLON
            const EQUALS = exports("EQUALS", 187); // Firefox (Gecko) fires 61 for EQUALS
            const COMMA = exports("COMMA", 188);
            const DASH = exports("DASH", 189); // Firefox (Gecko) fires 173 for DASH/MINUS
            const PERIOD = exports("PERIOD", 190);
            const SLASH = exports("SLASH", 191);
            const APOSTROPHE = exports("APOSTROPHE", 192);
            const TILDE = exports("TILDE", 192);
            const OPEN_SQUARE_BRACKET = exports("OPEN_SQUARE_BRACKET", 219);
            const BACKSLASH = exports("BACKSLASH", 220);
            const CLOSE_SQUARE_BRACKET = exports("CLOSE_SQUARE_BRACKET", 221);
            const SINGLE_QUOTE = exports("SINGLE_QUOTE", 222);
            const MAC_META = exports("MAC_META", 224);

            /**
             * Checks whether a modifier key is pressed.
             * @param event Event to be checked.
             */
            function hasModifierKey(event, ...modifiers) {
              if (modifiers.length) {
                return modifiers.some(modifier => event[modifier]);
              }
              return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
            }

        })
    };
}));
//# sourceMappingURL=keycodes.js.map
