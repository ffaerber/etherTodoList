// SPDX-License-Identifier: MIT
pragma solidity >=0.6.4;


library Validate {
    function title(string memory str) internal pure returns (bool) {
        bytes memory b = bytes(str);
        if (b.length < 1) return false;
        if (b.length > 245) return false;
        for (uint256 i; i < b.length; i++) {
            bytes1 char = b[i];
            if (
                !(char >= 0x30 && char <= 0x39) && //9-0
                !(char >= 0x41 && char <= 0x5A) && //A-Z
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char == 0x2E) && //.
                !(char == 0x20) && //SP
                !(char == 0x21) //!
            ) return false;
        }
        return true;
    }
}
