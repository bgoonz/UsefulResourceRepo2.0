// Knochenmark

#include "ergodox.h"
#include "debug.h"
#include "action_layer.h"
#include "keymap_german.h"

// Layer names
#define BASE 0 // default layer
#define SYMB 1 // symbol layer
#define MDIA 2 // media keys

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
/* Keymap 0: Basic layer
 *
 *
 * ,--------------------------------------------------.           ,--------------------------------------------------.
 * |  Esc   |   1  |   2  |   3  |   4  |   5  |  &   |           | PRSC |   6  |   7  |   8  |   9  |   0  |   ß    |
 * |--------+------+------+------+------+-------------|           |------+------+------+------+------+------+--------|
 * |  Tab   |   Q  |   W  |   E  |   R  |   T  |  L1  |           |  L1  |   Z  |   U  |   I  |   O  |   P  |   Ü    |
 * |--------+------+------+------+------+------|      |           |      |------+------+------+------+------+--------|
 * |  Caps  |   A  |   S  |   D  |   F  |   G  |------|           |------|   H  |   J  |   K  |   L  |   Ö  |   Ä    |
 * |--------+------+------+------+------+------|  L2  |           |  L2  |------+------+------+------+------+--------|
 * | LShift |   Y  |   X  |   C  |   V  |   B  |      |           |      |   N  |   M  |   ,  |   .  |   -  | RShift |
 * `--------+------+------+------+------+-------------'           `-------------+------+------+------+------+--------'
 *   | LCtrl|   ^  | LGui | LAlt |  L1  |                                       |  L2  | RAlt |      |      |      |
 *   `----------------------------------'                                       `----------------------------------'
 *                                        ,-------------.       ,-------------.
 *                                        | CTRL | ALT  |       | RAlt |RCtrl |
 *                                 ,------+------+------|       |------+--------+------.
 *                                 |      |      | PgUp |       | PgDn |        |      |
 *                                 |Space | Del  |------|       |------| Bspace | Enter|
 *                                 |      |      | Home |       | End  |        |      |
 *                                 `--------------------'       `----------------------'
 */
// If it accepts an argument (i.e, is a function), it doesn't need KC_.
// Otherwise, it needs KC_*
[BASE] = KEYMAP(  // layer 0 : default
        // left hand
        KC_ESC,       KC_1,    KC_2,     KC_3,     KC_4,     KC_5,   M(2),
        KC_TAB,       KC_Q,    KC_W,     KC_E,     KC_R,     KC_T,   TT(2),
        KC_CAPS,      KC_A,    KC_S,     KC_D,     KC_F,     KC_G,
        KC_LSFT,      DE_Y,    KC_X,     KC_C,     KC_V,     KC_B,   TT(1),
        KC_LCTRL,     DE_CIRC, KC_LGUI,  KC_LALT,  TT(1),
                                               KC_LCTRL, KC_LALT,
                                                              KC_PGUP,
                                               KC_SPC,KC_DELT,KC_HOME,
        // right hand
        KC_PSCREEN,  KC_6,   KC_7,    KC_8,    KC_9,     KC_0,       KC_MINS,
        TT(2),       DE_Z,   KC_U,    KC_I,    KC_O,     KC_P,       DE_UE,
                     KC_H,   KC_J,    KC_K,    KC_L,     DE_OE,      DE_AE,
        TT(1),       KC_N,   KC_M,    KC_COMM, KC_DOT,   DE_MINS,    KC_RSFT,
                             TT(2),   KC_RALT, KC_TRNS,  KC_TRNS,    KC_TRNS,
        KC_RALT, KC_RCTRL,
        KC_PGDN,
        KC_END, KC_BSPC, KC_ENT
    ),
/* Keymap 1: Symbol Layer
 *
 * ,--------------------------------------------------.           ,--------------------------------------------------.
 * |        |      |      |      |      |      |      |           |      |      |      |      |      |      |        |
 * |--------+------+------+------+------+-------------|           |------+------+------+------+------+------+--------|
 * |        |   !  |   ´  |   (  |   )  |   |  |      |           |      |   /  |  P7  |  P8  |  P9  |   -  |   ,    |
 * |--------+------+------+------+------+------|      |           |      |------+------+------+------+------+--------|
 * |        |   #  |   $  |   {  |   }  |   &  |------|           |------|   *  |  P4  |  P5  |  P6  |   +  |   .    |
 * |--------+------+------+------+------+------|      |           |      |------+------+------+------+------+--------|
 * |        |   %  |   <  |   [  |   ]  |   <  |      |           |      |  P0  |  P1  |  P2  |  P3  |      |        |
 * `--------+------+------+------+------+-------------'           `-------------+------+------+------+------+--------'
 *   |      |      |      |      |      |                                       |      |      |      |      |      |
 *   `----------------------------------'                                       `----------------------------------'
 *                                        ,-------------.       ,-------------.
 *                                        |      |      |       |      |      |
 *                                 ,------|------|------|       |------+------+------.
 *                                 |      |      |      |       |      |      |      |
 *                                 |  -   |  =   |------|       |------|      |      |
 *                                 |      |      |      |       |      |      |      |
 *                                 `--------------------'       `--------------------'
 */
// SYMBOLS
[SYMB] = KEYMAP(
       // left hand
       KC_TRNS,KC_TRNS,KC_TRNS,KC_TRNS,KC_TRNS,KC_TRNS,KC_TRNS,
       KC_TRNS,DE_EXLM,DE_ACUT,M(0),   M(1),   DE_LCBR,KC_TRNS,
       KC_TRNS,DE_HASH,DE_DLR, DE_LPRN,DE_RPRN,DE_AMPR,
       KC_TRNS,DE_PERC,DE_CIRC,DE_LBRC,DE_RBRC,DE_CIRC,KC_TRNS,
       KC_TRNS,KC_TRNS,KC_TRNS,KC_TRNS,KC_TRNS,
                                       KC_TRNS,KC_TRNS,
                                               KC_TRNS,
                               DE_MINS,KC_PEQL,KC_TRNS,
       // right hand
       KC_TRNS, KC_TRNS, KC_TRNS,KC_TRNS, KC_TRNS, KC_TRNS, KC_TRNS,
       KC_TRNS, KC_PSLS, KC_P7,  KC_P8,   KC_P9,   KC_PMNS, KC_PCMM,
                KC_PAST, KC_P4,  KC_P5,   KC_P6,   KC_PPLS, KC_PDOT,
       KC_TRNS, KC_P0,   KC_P1,  KC_P2,   KC_P3,   KC_TRNS, KC_TRNS,
                         KC_TRNS,KC_TRNS, KC_TRNS, KC_TRNS, KC_TRNS,
       KC_TRNS, KC_TRNS,
       KC_TRNS,
       KC_TRNS, KC_TRNS, KC_TRNS
),
/* Keymap 2: Media and mouse keys
 *
 * ,--------------------------------------------------.           ,--------------------------------------------------.
 * |        |  F1  |  F2  |  F3  |  F4  |  F5  |  F6  |           |  F7  |  F8  |  F9  |  F10 |  F11 |  F12 |        |
 * |--------+------+------+------+------+-------------|           |------+------+------+------+------+------+--------|
 * |        |      | Lclk | MsUp | Rclk |      |      |           |      |      | Home |  Up  |  End |      |        |
 * |--------+------+------+------+------+------|      |           |      |------+------+------+------+------+--------|
 * |        | Btn4 |MsLeft|MsDown|MsRght| Btn5 |------|           |------|      | Left | Down | Right|      |        |
 * |--------+------+------+------+------+------|      |           |      |------+------+------+------+------+--------|
 * |        |WhRght|WhDown| WhUp |WhLeft|WhClk |      |           |      | Mute | Prev | Stop | Play | Next |        |
 * `--------+------+------+------+------+-------------'           `-------------+------+------+------+------+--------'
 *   |      |      |MsAcl0|MsAcl1|MsAcl2|                                       |      |      |BwRefr|BwSrch|BwHome|
 *   `----------------------------------'                                       `----------------------------------'
 *                                        ,-------------.       ,-------------.
 *                                        |      |      |       |      |      |
 *                                 ,------|------|------|       |------+------+------.
 *                                 |      |      |      |       |BrFowd|      |      |
 *                                 | Lclk | Rclk |------|       |------|VolDwn| VolUp|
 *                                 |      |      |      |       |BrBack|      |      |
 *                                 `--------------------'       `--------------------'
 */
// MEDIA AND MOUSE
[MDIA] = KEYMAP(
       KC_TRNS, KC_F1  , KC_F2  , KC_F3  , KC_F4  , KC_F5  , KC_F6,
       KC_TRNS, KC_TRNS, KC_BTN1, KC_MS_U, KC_BTN2, KC_TRNS, KC_TRNS,
       KC_TRNS, KC_BTN4, KC_MS_L, KC_MS_D, KC_MS_R, KC_BTN5,
       KC_TRNS, KC_WH_L, KC_WH_D, KC_WH_U, KC_WH_R, KC_BTN3, KC_TRNS,
       KC_TRNS, KC_TRNS, KC_ACL0, KC_ACL1, KC_ACL2,
                                           KC_TRNS, KC_TRNS,
                                                    KC_TRNS,
                                  KC_BTN1, KC_BTN2, KC_TRNS,
    // right hand
       KC_F7,   KC_F8,   KC_F9,   KC_F10,  KC_F11,  KC_F12,  KC_TRNS,
       KC_TRNS, KC_TRNS, KC_HOME, KC_UP,   KC_END,  KC_TRNS, KC_TRNS,
                KC_TRNS, KC_LEFT, KC_DOWN, KC_RGHT, KC_TRNS, KC_TRNS,
       KC_TRNS, KC_MUTE, KC_MPRV, KC_MSTP, KC_MPLY, KC_MNXT, KC_TRNS,
                         KC_TRNS, KC_TRNS, KC_WREF, KC_WSCH, KC_WHOM,
       KC_TRNS, KC_TRNS,
       KC_WFWD,
       KC_WBAK, KC_VOLD, KC_VOLU
),
};

const uint16_t PROGMEM fn_actions[] = {
    [1] = ACTION_LAYER_TAP_TOGGLE(SYMB)                // FN1 - Momentary Layer 1 (Symbols)
};

const macro_t *action_get_macro(keyrecord_t *record, uint8_t id, uint8_t opt)
{
  // MACRODOWN only works in this function
      if (record->event.pressed) {
        switch(id){
          case 0:
            return MACRO(D(RALT), T(5), U(RALT), END);
          case 1:
            return MACRO(D(RALT), T(6), U(RALT), END);
          case 2:
            return MACRO(D(LSFT), T(6), U(LSFT), END);
        }
      }
    return MACRO_NONE;
};

// Runs just one time when the keyboard initializes.
void matrix_init_user(void) {

};

// Runs constantly in the background, in a loop.
void matrix_scan_user(void) {

    uint8_t layer = biton32(layer_state);

    ergodox_board_led_off();
    ergodox_right_led_1_off();
    ergodox_right_led_2_off();
    ergodox_right_led_3_off();
    switch (layer) {
        case SYMB:
            ergodox_right_led_1_on();
            break;
        case MDIA:
            ergodox_right_led_2_on();
            break;
        default:
            ergodox_board_led_off();
            break;
    }

};
