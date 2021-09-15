var escapeHTML = function(s) {
    return s.replace(
        /([<>&""''])/g,
        function(m, c) {
            switch(c) {
                case "<": return "&lt;";
                case ">": return "&gt;";
                case "&": return "&amp;";
                case '"': return "&quot;";
                case "'": return "&apos;";
            }
            return c;
        }
    );
};