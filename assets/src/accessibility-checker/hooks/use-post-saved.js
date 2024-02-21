const { useState, useEffect, useRef } = wp.element;
const { useSelect } = wp.data;

const usePostSaved = () => {
	const is_saving = useSelect((select) =>
		select("core/editor").isSavingPost()
	);
	const [was_saving, setWasSaving] = useState(is_saving);

	if (was_saving) {
		if (!is_saving) {
			setWasSaving(false);

			return true;
		}
	} else if (is_saving) {
		setWasSaving(true);
	}

	return false;
};

export default usePostSaved;
