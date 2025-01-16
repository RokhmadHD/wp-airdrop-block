import { useBlockProps } from "@wordpress/block-editor";
const Save = ({ attributes }) => {
	const blockProps = useBlockProps.save();
	const {
		projectName,
		projectLogo,
		status,
		reward,
		endDate,
		raised,
		sosialLinks,
		airdropLink,
	} = attributes;

	return null
}

export default Save;
