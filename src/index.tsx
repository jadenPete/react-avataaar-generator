import Avatar, { Piece, Props } from "avataaars"
import React from "react"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Row from "react-bootstrap/Row"
import Tab from "react-bootstrap/Tab"

import { OPTIONS } from "./options"

function Color(props: {color: string, onClick: () => void}) {
	return <div
		{...props.color == "#FFFFFF" ? {className: "border"} : {}}

		style={{
			backgroundColor: props.color,

			...props.color == "#FFFFFF" ? {} : {border: `1px solid ${props.color}`},

			display: "inline-block",
			width: "1.5rem",
			height: "1.5rem"
		}}

		onClick={() => props.onClick()}/>
}

export function AvatarGenerator(props: {value: Props, onChange?: (value: Props) => void}) {
	const handlePieceClick = (attr: string, val: string) =>
		props.onChange?.({
			...props.value,

			[attr]: val,
		})

	return <Tab.Container defaultActiveKey="top">
		<Row>
			<Col sm={3}>
				<Nav variant="pills" className="flex-column">
					{OPTIONS.map(option => <Nav.Item>
						<Nav.Link eventKey={option.type}>
							{option.label}
						</Nav.Link>
					</Nav.Item>)}
				</Nav>
			</Col>

			<Col>
				<div className="d-flex justify-content-center mb-4">
					<Avatar style={{width: "12.5rem", height: "12.5rem"}} {...props.value}/>
				</div>

				<Tab.Content>
					{OPTIONS.map(option => <Tab.Pane eventKey={option.type}>
						<div className="mb-4">
							{option.values.map(val => {
								let attr: any = {
									[option.attribute]: val
								}

								if (option.transform) {
									attr["style"] = {
										transform: option.transform
									}
								}

								let piece: string | React.CElement<Props, Piece>
								const props: {className?: string, style?: object} = {}

								if (option.type == "avatarStyle") {
									piece = val
									props.className = "btn btn-outline-primary me-2"
								} else {
									if (val == "Blank" || val == "NoHair") {
										piece = <i className="fas fa-times"/>
									} else {
										piece = <Piece pieceType={option.type} {...attr}/>
									}

									props.className = "btn border mb-1 me-1 p-1 text-primary"
									props.style = {
										width: "3rem",
										height: "3rem"
									}
								}

								return <button
									type="button"
									onClick={() => handlePieceClick(option.attribute, val)}
									{...props}>{piece}</button>
							})}
						</div>

						<div className="d-flex justify-content-center">
							{"colors" in option &&
								(option.type != "top" ||
								option.hats.indexOf(props.value.topType) == -1) &&
								props.value.topType != "Eyepatch" &&
								props.value.topType != "LongHairShavedSides" &&
								props.value.topType != "LongHairFrida" ?
								Object.entries(option.colors).map(([colorName, color]) =>
									<Color
										color={color}
										onClick={() => handlePieceClick(option.colorAttribute, colorName)}/>)
								: null}

							{"hatColors" in option &&
								option.hats.indexOf(props.value.topType) !== -1 &&
								props.value.topType !== "Hat" ?
								Object.entries(option.hatColors).map(([colorName, color]) =>
									<Color
										color={color}
										onClick={() => handlePieceClick("hatColor", colorName)}/>)
								: null}
						</div>
					</Tab.Pane>)}
				</Tab.Content>
			</Col>
		</Row>
	</Tab.Container>
}
