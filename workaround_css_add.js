let css = document.createElement("style")

css.innerHTML = `
/*advancedsearch*/
.as_title {
    color: var(--yt-spec-text-primary);
}

.as_link, .as_link:visited {
    color: var(--yt-spec-text-secondary);
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
}

.as_autocomplete {
    background: var(--yt-spec-general-background-a);
}
`

document.body.appendChild(css)