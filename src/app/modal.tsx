import React from "react"

export default function Modal(props: { showFlag: boolean, setShowModal: any, name: string, artist: string, description: string, url: string, alt: string }) {
    const modalContent = {
        background: "white",
        padding: "10px",
        borderRadius: "3px",
    };
    
    const overlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
    
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    const titleBox = {
        display: "inline-block",
        align: "center"
    }
    const imageBox = {
        display: "inline-block",
        align: "center"
    }
    
    // Closeボタンクリックイベント
    function handleCloseClick() {
        props.setShowModal(false);
    }
    return (
        <>
        {
            props.showFlag ? (
                <div id="overlay" style={overlay}>
                    <div id="modalContents" style={modalContent}>
                        <div style={imageBox}>
                            <img 
                                src={props.url}
                                alt={props.alt} 
                                onClick={handleCloseClick}
                                height={500}
                            />
                        </div>
                        <div style={titleBox}>
                            <h2>{props.name} by {props.artist}</h2>
                            <p>{props.description}</p>
                        </div>
                    </div>
                </div>
            ) :
            (
                <></>
            )
        }
        </>
    )

}