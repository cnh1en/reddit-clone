import React, { useState } from 'react';

const useSelectedFile = () => {
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

	const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		if (event.target.files?.[0]) {
			reader.readAsDataURL(event.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			if (readerEvent.target?.result) {
				setSelectedFiles([readerEvent.target?.result as string]);
			}
		};
	};

	return {
		selectedFiles,
		setSelectedFiles,
		onSelectImage,
	};
};

export default useSelectedFile;
