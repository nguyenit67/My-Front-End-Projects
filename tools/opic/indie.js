function htmlEncode(str = "") {
    return Array.from(str)
        .map(ch => `$#${ch.codePointAt()};`)
        .join("")
}