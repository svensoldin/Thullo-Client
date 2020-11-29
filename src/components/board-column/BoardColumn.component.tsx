import * as React from "react";

import AddIcon from "@material-ui/icons/Add";
import CardThumbnail from "../../components/card-thumbnail/CardThumbnail.component";
import "./BoardColumn.styles.css";

type Card = {
	title: string;
	comments: Array<any> | []; // Define this type later
	labels: Array<{ body: string; color: string }> | [];
	attachments: Array<{ fileName: string }> | [];
	_id: string;
};

type Props = {
	title: string;
	cards: Array<Card>;
};

const BoardColumn = ({ title, cards }: Props) => {
	return (
		<div className="column">
			<h2 className="column-title">{title}</h2>
			{cards.map((card) => (
				<CardThumbnail key={card._id} card={card}></CardThumbnail>
			))}
			<div className="add-card">
				<AddIcon className="add-icon" />
				<p className="add-card-text">Add another card</p>
			</div>
		</div>
	);
};

export default BoardColumn;