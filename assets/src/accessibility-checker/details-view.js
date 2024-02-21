const { useState, useEffect, useRef } = wp.element;
const { Popover, Button } = wp.components;

const DetailsView = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [skipNext, setSkipNext] = useState(false);
	const toggleButton = useRef(null);

	// hack to prevent reopening popover when clicking the button to close
	useEffect(() => {
		document.addEventListener("click", resetSkipNext);

		return () => {
			document.removeEventListener("click", resetSkipNext);
		};
	}, []);

	function resetSkipNext(e) {
		setSkipNext(false);
	}

	function toggle(e) {
		if (!skipNext) {
			setIsOpen((state) => !state);
		}

		setSkipNext(e === undefined);
	}

	function getAnchorProp() {
		return WSUWP_ACCESSIBILITY_PLUGIN_DATA.wpVersion.startsWith("6.")
			? {
					// onFocusOutside: toggle,
					focusOnMount: true,
					placement: "left-start",
					offset: 12,
					anchor: toggleButton.current.closest(
						".wsu-gutenberg-accessibility-panel__report-table-row"
					),
			  }
			: {
					position: "bottom left",
					getAnchorRect: () => {
						const rect =
							toggleButton.current
								.closest(
									".wsu-gutenberg-accessibility-panel__report-table-row"
								)
								?.getBoundingClientRect() || null;

						if (rect) {
							rect.x =
								rect.right -
								rect.width -
								rect.width / 2 -
								25 -
								8; // 😵🥴
							rect.y = rect.y - rect.height - 10;

							return rect;
						}

						return null;
					},
			  };
	}

	return (
		<>
			<Button ref={toggleButton} isLink={true} onClick={toggle}>
				Details
			</Button>
			{isOpen && (
				<Popover
					className="wsu-gutenberg-accessibility-panel__details-view"
					onClose={toggle}
					{...getAnchorProp()}
				>
					{props.children}
				</Popover>
			)}
		</>
	);
};

export default DetailsView;
