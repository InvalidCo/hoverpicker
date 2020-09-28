#HoverPicker JavaScript extension library

Small extension utility library for picking text off of webpages with the wave of a mouse cursor.

##Test Example
1. Load as Temporary Add-on (Firefox) or Install Unpacked (Chrome)
2. Navigate to [Wikipedia](https://en.wikipedia.org/)
3. Hover cursor over words for quick word reversal

##Before You Use
1. Use memoization for network calls and/or heavy computation! The on-hover/pick/blur methods is called multiple times for the same underlying text pickings.
2. Remember to sanitize! The tooltip implementation takes raw HTML as input. This is _especially_ **dangerous** in the context of a context script.

