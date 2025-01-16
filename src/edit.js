import { __ } from "@wordpress/i18n";
import { debounce } from "lodash";
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	TextControl,
	TextareaControl,
	SelectControl,
	PanelBody,
	Button,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

const Edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
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

	const [newLink, setNewLink] = useState("");
	const [localProjectName, setLocalProjectName] = useState(projectName || "");
	const [localReward, setLocalReward] = useState(reward || "");
	const [localRaised, setLocalRaised] = useState(raised || "");
	const [localAirdropLink, setLocalAirdropLink] = useState(airdropLink || "");
	const [localAirdropStatus, setLocalAirdropStatus] = useState(status || "");
	const [localEndDate, setLocalEndDate] = useState(endDate || "");
	const [localSosialLinks, setLocalSosialLinks] = useState(sosialLinks || "");

	// Debounce update function
	const updateAttribute = debounce((key, value) => {
		setAttributes({ [key]: value });
	}, 300);

	// Update attributes after local state changes
	useEffect(() => {
		updateAttribute("projectName", localProjectName);
	}, [localProjectName]);

	useEffect(() => {
		updateAttribute("reward", localReward);
	}, [localReward]);

	useEffect(() => {
		updateAttribute("raised", localRaised);
	}, [localRaised]);

	useEffect(() => {
		updateAttribute("airdropLink", localAirdropLink);
	}, [localAirdropLink]);

	useEffect(() => {
		updateAttribute("status", localAirdropStatus);
	}, [localAirdropStatus]);

	useEffect(() => {
		updateAttribute("endDate", localEndDate);
	}, [localEndDate]);

	useEffect(() => {
		updateAttribute("sosialLinks", localSosialLinks);
	}, [localSosialLinks]);

	const addSocialLink = () => {
		if (newLink.trim()) {
			const sosialLinksArr = sosialLinks
				.split(",")
				.map((link) => link.trim()) // Hapus whitespace dari setiap elemen
				.filter((link) => !link == ""); // Hapus elemen kosong

			const updatedLinks = [...sosialLinksArr, newLink.trim()];

			setLocalSosialLinks(updatedLinks.join(",")); // Gabungkan kembali menjadi string
			setNewLink(""); // Reset input
		}
	};

	const removeSocialLink = (indexToRemove) => {
		const updatedLinks = sosialLinks
			.split(",")
			.filter((_, index) => index !== indexToRemove);
		setLocalSosialLinks(updatedLinks.join(","));
	};

	return (
		<>
			{/* Sidebar Controls */}
			<InspectorControls>
				{/* Project settings */}
				<PanelBody
					title={__("Project Settings", "airdrop-block")}
					initialOpen={true}
				>
					{/* MediaUpload untuk Project Logo */}
					<div className="project-logo">
						<MediaUpload
							onSelect={(media) => setAttributes({ projectLogo: media.url })}
							allowedTypes={["image"]}
							value={projectLogo}
							render={({ open }) => (
								<button
									style={{
										width: "100px",
										height: "100px",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										border: "none",
										borderRadius: "50%",
										cursor: "pointer",
										marginTop: "10px",
										marginBottom: "20px",
									}}
									onClick={open}
								>
									{projectLogo ? (
										<img
											src={projectLogo}
											alt={__("Project Logo", "airdrop-block")}
											style={{
												maxWidth: "100px",
												height: "100px",
												borderRadius: "50%",
											}}
										/>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											style={{
												width: "50px",
												height: "50px",
											}}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
											/>
										</svg>
									)}
								</button>
							)}
						/>
					</div>
					<TextControl
						label={__("Project Name", "airdrop-block")}
						value={localProjectName}
						onChange={(value) => setLocalProjectName(value)}
					/>
					<TextControl
						label={__("Raised", "airdrop-block")}
						type="number"
						value={localRaised}
						onChange={(value) => setLocalRaised(value)}
					/>
						<h2>Sosial Links</h2>
					<ul>
						{sosialLinks &&
							sosialLinks.split(",").map((task, index) => (
								<li key={index}>
									{task}
									<Button
										isDestructive
										onClick={() => removeSocialLink(index)}
										style={{ marginLeft: "10px" }}
									>
										{__("Remove", "airdrop-block")}
									</Button>
								</li>
							))}
					</ul>
					<div style={{ display: "flex", gap: "1rem" }}>
						<TextControl
							placeholder={__("https://", "airdrop-block")}
							value={newLink}
							onChange={(value) => setNewLink(value)}
						/>
						<Button
							isPrimary
							onClick={addSocialLink}
							style={{ borderRadius: "5px" }}
						>
							{__("Add", "airdrop-block")}
						</Button>
					</div>
					<TextControl
						label={__("Airdrop Link", "airdrop-block")}
						value={localAirdropLink}
						onChange={(value) => setLocalAirdropLink(value)}
					/>
					<SelectControl
						label={__("Status", "airdrop-block")}
						value={localAirdropStatus}
						options={[
							{ label: "Active", value: "active" },
							{ label: "End", value: "end" },
							{ label: "Distribution", value: "distribution" },
							{ label: "Scam", value: "scam" },
						]}
						onChange={(value) => setLocalAirdropStatus(value)}
					/>
					<TextControl
						label={__("Reward", "airdrop-block")}
						value={localReward}
						onChange={(value) => setLocalReward(value)}
					/>
					<TextControl
						label={__("End Date", "airdrop-block")}
						type="date"
						value={localEndDate}
						onChange={(value) => setLocalEndDate(value)}
					/>
				</PanelBody>
			</InspectorControls>

			{/* Block Preview */}
			<div {...blockProps}>
				
			</div>
		</>
	);
};

export default Edit;
