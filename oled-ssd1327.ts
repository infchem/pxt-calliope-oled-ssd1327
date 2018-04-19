/**
 * Functions for the greyscale oled display from Seeed Studio (the square one)
 */
enum Mode {
    normal,
    inverted
}

//% weight=100 color=#0fbc11 icon="\uf108" block="OLED (greyscale)"
//% parts="oled_ssd1327"
namespace oled_ssd1327 {
    let i2cAdress: int8 = 0x3c;
    let basicFont: int8[] = [
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // " "
        0x00, 0x00, 0x5F, 0x00, 0x00, 0x00, 0x00, 0x00, // "!"
        0x00, 0x00, 0x07, 0x00, 0x07, 0x00, 0x00, 0x00, // """
        0x00, 0x14, 0x7F, 0x14, 0x7F, 0x14, 0x00, 0x00, // "#"
        0x00, 0x24, 0x2A, 0x7F, 0x2A, 0x12, 0x00, 0x00, // "$"
        0x00, 0x23, 0x13, 0x08, 0x64, 0x62, 0x00, 0x00, // "%"
        0x00, 0x36, 0x49, 0x55, 0x22, 0x50, 0x00, 0x00, // "&"
        0x00, 0x00, 0x05, 0x03, 0x00, 0x00, 0x00, 0x00, // "'"
        0x00, 0x1C, 0x22, 0x41, 0x00, 0x00, 0x00, 0x00, // "("
        0x00, 0x41, 0x22, 0x1C, 0x00, 0x00, 0x00, 0x00, // ")"
        0x00, 0x08, 0x2A, 0x1C, 0x2A, 0x08, 0x00, 0x00, // "*"
        0x00, 0x08, 0x08, 0x3E, 0x08, 0x08, 0x00, 0x00, // "+"
        0x00, 0xA0, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00, // ","
        0x00, 0x08, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00, // "-"
        0x00, 0x60, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00, // "."
        0x00, 0x20, 0x10, 0x08, 0x04, 0x02, 0x00, 0x00, // "/"
        0x00, 0x3E, 0x51, 0x49, 0x45, 0x3E, 0x00, 0x00, // "0"
        0x00, 0x00, 0x42, 0x7F, 0x40, 0x00, 0x00, 0x00, // "1"
        0x00, 0x62, 0x51, 0x49, 0x49, 0x46, 0x00, 0x00, // "2"
        0x00, 0x22, 0x41, 0x49, 0x49, 0x36, 0x00, 0x00, // "3"
        0x00, 0x18, 0x14, 0x12, 0x7F, 0x10, 0x00, 0x00, // "4"
        0x00, 0x27, 0x45, 0x45, 0x45, 0x39, 0x00, 0x00, // "5"
        0x00, 0x3C, 0x4A, 0x49, 0x49, 0x30, 0x00, 0x00, // "6"
        0x00, 0x01, 0x71, 0x09, 0x05, 0x03, 0x00, 0x00, // "7"
        0x00, 0x36, 0x49, 0x49, 0x49, 0x36, 0x00, 0x00, // "8"
        0x00, 0x06, 0x49, 0x49, 0x29, 0x1E, 0x00, 0x00, // "9"
        0x00, 0x00, 0x36, 0x36, 0x00, 0x00, 0x00, 0x00, // ":"
        0x00, 0x00, 0xAC, 0x6C, 0x00, 0x00, 0x00, 0x00, // ";"
        0x00, 0x08, 0x14, 0x22, 0x41, 0x00, 0x00, 0x00, // "<"
        0x00, 0x14, 0x14, 0x14, 0x14, 0x14, 0x00, 0x00, // "="
        0x00, 0x41, 0x22, 0x14, 0x08, 0x00, 0x00, 0x00, // ">"
        0x00, 0x02, 0x01, 0x51, 0x09, 0x06, 0x00, 0x00, // "?"
        0x00, 0x32, 0x49, 0x79, 0x41, 0x3E, 0x00, 0x00, // "@"
        0x00, 0x7E, 0x09, 0x09, 0x09, 0x7E, 0x00, 0x00, // "A"
        0x00, 0x7F, 0x49, 0x49, 0x49, 0x36, 0x00, 0x00, // "B"
        0x00, 0x3E, 0x41, 0x41, 0x41, 0x22, 0x00, 0x00, // "C"
        0x00, 0x7F, 0x41, 0x41, 0x22, 0x1C, 0x00, 0x00, // "D"
        0x00, 0x7F, 0x49, 0x49, 0x49, 0x41, 0x00, 0x00, // "E"
        0x00, 0x7F, 0x09, 0x09, 0x09, 0x01, 0x00, 0x00, // "F"
        0x00, 0x3E, 0x41, 0x41, 0x51, 0x72, 0x00, 0x00, // "G"
        0x00, 0x7F, 0x08, 0x08, 0x08, 0x7F, 0x00, 0x00, // "H"
        0x00, 0x41, 0x7F, 0x41, 0x00, 0x00, 0x00, 0x00, // "I"
        0x00, 0x20, 0x40, 0x41, 0x3F, 0x01, 0x00, 0x00, // "J"
        0x00, 0x7F, 0x08, 0x14, 0x22, 0x41, 0x00, 0x00, // "K"
        0x00, 0x7F, 0x40, 0x40, 0x40, 0x40, 0x00, 0x00, // "L"
        0x00, 0x7F, 0x02, 0x0C, 0x02, 0x7F, 0x00, 0x00, // "M"
        0x00, 0x7F, 0x04, 0x08, 0x10, 0x7F, 0x00, 0x00, // "N"
        0x00, 0x3E, 0x41, 0x41, 0x41, 0x3E, 0x00, 0x00, // "O"
        0x00, 0x7F, 0x09, 0x09, 0x09, 0x06, 0x00, 0x00, // "P"
        0x00, 0x3E, 0x41, 0x51, 0x21, 0x5E, 0x00, 0x00, // "Q"
        0x00, 0x7F, 0x09, 0x19, 0x29, 0x46, 0x00, 0x00, // "R"
        0x00, 0x26, 0x49, 0x49, 0x49, 0x32, 0x00, 0x00, // "S"
        0x00, 0x01, 0x01, 0x7F, 0x01, 0x01, 0x00, 0x00, // "T"
        0x00, 0x3F, 0x40, 0x40, 0x40, 0x3F, 0x00, 0x00, // "U"
        0x00, 0x1F, 0x20, 0x40, 0x20, 0x1F, 0x00, 0x00, // "V"
        0x00, 0x3F, 0x40, 0x38, 0x40, 0x3F, 0x00, 0x00, // "W"
        0x00, 0x63, 0x14, 0x08, 0x14, 0x63, 0x00, 0x00, // "X"
        0x00, 0x03, 0x04, 0x78, 0x04, 0x03, 0x00, 0x00, // "Y"
        0x00, 0x61, 0x51, 0x49, 0x45, 0x43, 0x00, 0x00, // "Z"
        0x00, 0x7F, 0x41, 0x41, 0x00, 0x00, 0x00, 0x00, // "["
        0x00, 0x02, 0x04, 0x08, 0x10, 0x20, 0x00, 0x00, // "\"
        0x00, 0x41, 0x41, 0x7F, 0x00, 0x00, 0x00, 0x00, // "]"
        0x00, 0x04, 0x02, 0x01, 0x02, 0x04, 0x00, 0x00, // "^"
        0x00, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00, 0x00, // "_"
        0x00, 0x01, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00, // "`"
        0x00, 0x20, 0x54, 0x54, 0x54, 0x78, 0x00, 0x00, // "a"
        0x00, 0x7F, 0x48, 0x44, 0x44, 0x38, 0x00, 0x00, // "b"
        0x00, 0x38, 0x44, 0x44, 0x28, 0x00, 0x00, 0x00, // "c"
        0x00, 0x38, 0x44, 0x44, 0x48, 0x7F, 0x00, 0x00, // "d"
        0x00, 0x38, 0x54, 0x54, 0x54, 0x18, 0x00, 0x00, // "e"
        0x00, 0x08, 0x7E, 0x09, 0x02, 0x00, 0x00, 0x00, // "f"
        0x00, 0x18, 0xA4, 0xA4, 0xA4, 0x7C, 0x00, 0x00, // "g"
        0x00, 0x7F, 0x08, 0x04, 0x04, 0x78, 0x00, 0x00, // "h"
        0x00, 0x00, 0x7D, 0x00, 0x00, 0x00, 0x00, 0x00, // "i"
        0x00, 0x80, 0x84, 0x7D, 0x00, 0x00, 0x00, 0x00, // "j"
        0x00, 0x7F, 0x10, 0x28, 0x44, 0x00, 0x00, 0x00, // "k"
        0x00, 0x41, 0x7F, 0x40, 0x00, 0x00, 0x00, 0x00, // "l"
        0x00, 0x7C, 0x04, 0x18, 0x04, 0x78, 0x00, 0x00, // "m"
        0x00, 0x7C, 0x08, 0x04, 0x7C, 0x00, 0x00, 0x00, // "n"
        0x00, 0x38, 0x44, 0x44, 0x38, 0x00, 0x00, 0x00, // "o"
        0x00, 0xFC, 0x24, 0x24, 0x18, 0x00, 0x00, 0x00, // "p"
        0x00, 0x18, 0x24, 0x24, 0xFC, 0x00, 0x00, 0x00, // "q"
        0x00, 0x00, 0x7C, 0x08, 0x04, 0x00, 0x00, 0x00, // "r"
        0x00, 0x48, 0x54, 0x54, 0x24, 0x00, 0x00, 0x00, // "s"
        0x00, 0x04, 0x7F, 0x44, 0x00, 0x00, 0x00, 0x00, // "t"
        0x00, 0x3C, 0x40, 0x40, 0x7C, 0x00, 0x00, 0x00, // "u"
        0x00, 0x1C, 0x20, 0x40, 0x20, 0x1C, 0x00, 0x00, // "v"
        0x00, 0x3C, 0x40, 0x30, 0x40, 0x3C, 0x00, 0x00, // "w"
        0x00, 0x44, 0x28, 0x10, 0x28, 0x44, 0x00, 0x00, // "x"
        0x00, 0x1C, 0xA0, 0xA0, 0x7C, 0x00, 0x00, 0x00, // "y"
        0x00, 0x44, 0x64, 0x54, 0x4C, 0x44, 0x00, 0x00, // "z"
        0x00, 0x08, 0x36, 0x41, 0x00, 0x00, 0x00, 0x00, // "{"
        0x00, 0x00, 0x7F, 0x00, 0x00, 0x00, 0x00, 0x00, // "|"
        0x00, 0x41, 0x36, 0x08, 0x00, 0x00, 0x00, 0x00, // "}"
        0x00, 0x02, 0x01, 0x01, 0x02, 0x01, 0x00, 0x00  // "~"
    ]
    let extendedCharacters: int8[] = [
        0x00, 0x7D, 0x0A, 0x09, 0x0A, 0x7D, 0x00, 0x00, // "Ä"
        0x00, 0x3D, 0x42, 0x41, 0x42, 0x3D, 0x00, 0x00, // "Ö"
        0x00, 0x3D, 0x40, 0x40, 0x40, 0x3D, 0x00, 0x00, // "Ü"
        0x00, 0x21, 0x54, 0x54, 0x55, 0x78, 0x00, 0x00, // "ä"
        0x00, 0x39, 0x44, 0x44, 0x39, 0x00, 0x00, 0x00, // "ö"
        0x00, 0x3D, 0x40, 0x40, 0x7D, 0x00, 0x00, 0x00, // "ü"
        0x00, 0xFE, 0x09, 0x49, 0x36, 0x00, 0x00, 0x00, // "ß"
        0x00, 0x14, 0x3E, 0x55, 0x55, 0x55, 0x14, 0x00, // "€"
        0x00, 0x02, 0x05, 0x02, 0x00, 0x00, 0x00, 0x00, // "°"
        0x00, 0x0A, 0x55, 0x55, 0x55, 0x28, 0x00, 0x00  // "§"
    ]
    /**
     * Initialises the display.
     */
    //% weight=209
    //% blockId=oled_ssd1327_init block="initialize OLED"
    //% parts="oled_ssd1327"
    export function initDisplay() {
        music.playTone(3000, 500)
        let sequence1: int8[] = [
            0xfd, 0x12, 0xae, 0xa8, 0x5f, 0xa1, 0x00, 0xa2,
            0x60, 0xab, 0x01, 0x81, 0x53, 0xb1, 0x51, 0xb3,
            0x01, 0xb9, 0xbc, 0x08, 0xbe, 0x07, 0xb6, 0x01,
            0xd5, 0x62, 0xaf
        ]
        let sequence2: int8[] = [
            0x75, 0x00, 0x5f, 0x15, 0x08, 0x37
        ]
        for (let i = 0; i < sequence1.length; i++) {
            pins.i2cWriteNumber(i2cAdress, 0x8000 + sequence1[i], NumberFormat.UInt16BE)
        }
        control.waitMicros(100)
        for (let i = 0; i < sequence2.length; i++) {
            pins.i2cWriteNumber(i2cAdress, 0x8000 + sequence2[i], NumberFormat.UInt16BE)
        }
    }
    
    /**
     * Clears the display.
     */
    //% weight=208
    //% blockId=oled_ssd1327_clear block="clear OLED display"
    //% parts="oled_ssd1327"
    export function clearDisplay() {
        for (let j = 0; j < 48; j++) {
            for (let i = 0; i < 96; i++) {
                pins.i2cWriteNumber(i2cAdress, 0x4000, NumberFormat.UInt16BE)
            }
        }
    }
    /**
     * Writes the text at row and column with the given hue.
     * @param text text to be written, eg = "Hello World"
     * @param row [0-11] row, eg = 5
     * @param col [0-11] column, eg = 1
     * @param hue [0-15] hue, eg = 10
     */
    //% row.min=0 row.max=11
    //% col.min=0 col.max=11
    //% hue.min=0 hue.max=15
    //% weight=207
    //% blockId=oled_ssd1327_text block="write text %text|row %row|column %col|hue %hue"
    //% parts="oled_ssd1327"
    export function writeText(text: string, row: number, col: number, hue: number) {
        setCursor(row, col)
        for (let p = 0; p <= text.length - 1; p++) {
            writeChar(text.substr(p, 1), hue)
        }
    }
    /**
     * Writes the number with the assumed width at row and column with the given hue.
     * @param theNumber number to be written, eg=-123
     * @param width[0-11] assumed width of the number, eg=4
     * @param row[0-11] row, eg=0
     * @param col[0-11] column, eg=0
     * @param hue[0-15] hue, eg=10
     */
    //% width.min=0 width.max=11
    //% row.min=0 row.max=11
    //% col.min=0 col.max=11
    //% hue.min=0 hue.max=15
     //% weight=206
    //% blockId=oled_ssd1327_number	block="write number %theNumber|width %width|row %row|column %col|hue %hue"
    //% parts="oled_ssd1327"
    export function writeNumber(theNumber: number, width: number, row: number, col: number, hue: number) {
        let r: number = 0
        let numberLength = theNumber.toString().length
        if (numberLength < width) {
            for (r = 0; r < (width - numberLength); r++) {
                writeChar(" ", hue)
            }
            writeText(theNumber.toString(), row, col, hue)
        } else if (numberLength > width) {
            for (r = 0; r < width; r++) {
                writeChar("*", hue)
            }
        } else {
            writeText(theNumber.toString(), row, col, hue)
        }
    }
    /**
     * Sets the display in normal or inverted mode.
     * @param mode mode of the display, eg = Normal
     */
    //% weight=205
    //% blockId=oled_ssd1327_mode block="set OLED mode to %mode"
	//% blockExternalInputs=1
    //% parts="oled_ssd1327"
    export function setDisplay(mode: Mode) {
        if (mode == Mode.normal) {
            pins.i2cWriteNumber(i2cAdress, 0x80a4, NumberFormat.UInt16BE)
        } else {
            pins.i2cWriteNumber(i2cAdress, 0x80a7, NumberFormat.UInt16BE)
        }
    }
	
	function setCursor(row: number, col: number) {
        pins.i2cWriteNumber(i2cAdress, 0x8015, NumberFormat.UInt16BE)
        pins.i2cWriteNumber(i2cAdress, 0x8008 + (col * 4), NumberFormat.UInt16BE)
        pins.i2cWriteNumber(i2cAdress, 0x8037, NumberFormat.UInt16BE)
        pins.i2cWriteNumber(i2cAdress, 0x8075, NumberFormat.UInt16BE)
        pins.i2cWriteNumber(i2cAdress, 0x8000 + (row * 8), NumberFormat.UInt16BE)
        pins.i2cWriteNumber(i2cAdress, 0x8007 + (row * 8), NumberFormat.UInt16BE)
    }
    function writeChar(theChar: string, hue: number) {
        let standardCharacter = true
        let charBaseIndex = 0
        switch (theChar.charCodeAt(0)) {
            case 196:
                charBaseIndex = 0 * 8
                standardCharacter = false
                break;
            case 214:
                charBaseIndex = 1 * 8
                standardCharacter = false
                break;
            case 220:
                charBaseIndex = 2 * 8
                standardCharacter = false
                break;
            case 228:
                charBaseIndex = 3 * 8
                standardCharacter = false
                break;
            case 246:
                charBaseIndex = 4 * 8
                standardCharacter = false
                break;
            case 252:
                charBaseIndex = 5 * 8
                standardCharacter = false
                break;
            case 223:
                charBaseIndex = 6 * 8
                standardCharacter = false
                break;
            case 172:
                charBaseIndex = 7 * 8
                standardCharacter = false
                break;
            case 176:
                charBaseIndex = 8 * 8
                standardCharacter = false
                break;
            case 167:
                charBaseIndex = 9 * 8
                standardCharacter = false
                break;
            default:
                if (theChar.charCodeAt(0) < 32 || theChar.charCodeAt(0) > 126) {
                    theChar = " "
                }
                charBaseIndex = (theChar.charCodeAt(0) - 32) * 8
                standardCharacter = true
                break;
        }
        let charColumn1 = 0
        let charColumn2 = 0
        for (let m = 0; m <= 3; m++) {
            if (standardCharacter) {
                charColumn1 = basicFont[charBaseIndex + (m * 2)]
                charColumn2 = basicFont[charBaseIndex + (m * 2) + 1]
            } else {
                charColumn1 = extendedCharacters[charBaseIndex + (m * 2)]
                charColumn2 = extendedCharacters[charBaseIndex + (m * 2) + 1]
            }
            for (let n = 0; n <= 7; n++) {
                let pixel1 = charColumn1 % 2
                let pixel2 = charColumn2 % 2
                let data = (pixel1 * 16 * hue) + (pixel2 * hue)
                pins.i2cWriteNumber(i2cAdress, 0x4000 + data, NumberFormat.UInt16BE)
                charColumn1 = charColumn1 / 2
                charColumn2 = charColumn2 / 2
            }
        }
    }
}
