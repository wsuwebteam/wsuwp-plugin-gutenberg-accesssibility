const missingHrefsCheck = (report, doc) => {
    const missingHrefs = [];
    const links = Array.from(doc.querySelectorAll("a"));

    function detailsView(missingHrefs) {
        return (
            <table className="wsu-gutenberg-accessibility-panel__details-table">
                <thead>
                    <tr>
                        <th>Link Text</th>
                        <th>Href</th>
                    </tr>
                </thead>
                <tbody>
                    {missingHrefs.map((l, idx) => (
                        <tr key={`link-` + idx}>
                            <td>
                                {l.textContent ||
                                    "(Not found. Possibly an image link)"}
                            </td>
                            <td>{l.getAttribute("href")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    links.forEach((l) => {
        const href = l.getAttribute("href");

        if (
            href === null ||
            href.trim() === "" ||
            href.trim() === "#" ||
            href.trim() === "http://" ||
            href.trim() === "https://"
        ) {
            missingHrefs.push(l);
        }
    });

    if (missingHrefs.length > 0) {
        const plural = missingHrefs.length > 1 ? "s" : "";
        report.errors.push({
            message: `${missingHrefs.length} link${plural} with missing or invalid href${plural}`,
            detailsViewLabel: "Links with missing or invalid hrefs",
            detailsView: detailsView.bind(this, missingHrefs),
        });
    }

    return report;
};

wp.hooks.addFilter(
    "wsu.Accessibility",
    "wsuwp/accessibility-checker",
    missingHrefsCheck
);
