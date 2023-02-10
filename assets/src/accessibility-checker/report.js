import DetailsView from "./details-view";
const { ExternalLink } = wp.components;
const { useRef } = wp.element;

const ReportTable = (props) => {
  return (
    <>
      {props.logs.length > 0 ? (
        <>
          <table className="wsu-gutenberg-accessibility-panel__report-table">
            <tbody>
              {props.logs.map((l, idx) => {
                const tableRow = useRef(null);
                return (
                  <tr ref={tableRow} key={`rr-${idx}`}>
                    <td>{l.message}</td>
                    <td>
                      <DetailsView label={l.detailsViewLabel} anchor={tableRow}>
                        <l.detailsView />
                      </DetailsView>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <p className="wsu-gutenberg-accessibility-panel__report-empty-message">
          {props.emptyMessage}
        </p>
      )}
    </>
  );
};

const Report = (props) => {
  const { report, isLoading, error, permalink } = props;

  const reportSections = [
    { label: "Errors", icon: "dismiss", logs: report.errors },
    { label: "Alerts", icon: "warning", logs: report.alerts },
    { label: "Warnings", icon: "flag", logs: report.warnings },
  ];

  return (
    <>
      {!isLoading && !error ? (
        <>
          {reportSections.map((section) => (
            <div
              key={`section-${section.label}`}
              className="wsu-gutenberg-accessibility-panel__section"
            >
              <h3 className="wsu-gutenberg-accessibility-panel__section-heading">
                <span
                  className={`dashicon dashicons dashicons-${section.icon}`}
                ></span>{" "}
                {section.label}
              </h3>
              <ReportTable
                logs={section.logs}
                emptyMessage={`0 ${section.label.toLowerCase()} to display.`}
              />
            </div>
          ))}
        </>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>loading...</p>
      )}

      <ExternalLink
        className="wsu-gutenberg-accessibility-panel__wave-link"
        href={`https://wave.webaim.org/report#/` + permalink}
      >
        Review on WAVE
      </ExternalLink>
    </>
  );
};

export default Report;
