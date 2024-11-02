import React from 'react';
import './Removebg.css';
import { removeBackground } from "@imgly/background-removal";

function Removebg() {

  // NOTE THAT: HERE I WILL SEND FILE AS INPUT AND GET BLOB AS OUTPUT

  const [imgUploaded, setImgUploaded] = React.useState<any>(null);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [processedImg, setProcessedImg] = React.useState<any>(null);

  const processImage = () => {
    setIsProcessing(true);

    removeBackground(imgUploaded).then((blob: Blob) => {
      setProcessedImg(blob);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      setIsProcessing(false);
    })
  }

  const downloadImage = () => {
    if (processedImg) {
      const blobUrl = URL.createObjectURL(processedImg);
      const link = document.createElement('a');
      link.href = blobUrl;
      const originalFileName = imgUploaded.name.split('.').slice(0, -1).join('.');
      link.download = `${originalFileName}_removebg.png`

      // Click the link to trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up: remove the link and revoke the Blob URL
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }
  };

  return (
    <>
    <div className="headingDiv">
      <h2 className="heading">Remove Image BG</h2>
    </div>
    <div>
      { (!processedImg && !isProcessing) ? (
        <div className="unprocessedView">
          <div className="imgContainer">
            { imgUploaded ? (
              <img
                alt="not found"
                width={"200px"}
                height={"300px"}
                src={URL.createObjectURL(imgUploaded)}
              />
            ) : (
              <div className="unsetImg d-flex align-items-center justify-content-center bg-light border border-secondary rounded shadow-sm">
                <span>Image Will be Shown Here</span>
              </div>
            )}

            {/* Hidden Input Field For File Upload */}
            <input
              type="file"
              name="myImage"
              id="imageInput"
              style={{ display: "none" }}
              onChange={(event) => {
                console.log(event.target?.files ? event.target?.files[0] : null);
                setImgUploaded(event.target?.files ? event.target?.files[0] : null);
              }}
            />

            <div className="imgButtons">
              <button type="button" className="btn btn-info" onClick={() => document?.getElementById("imageInput")?.click()}>
                { imgUploaded ? `Change Image` : `Upload image`}
              </button>

              { imgUploaded && (
                <button type="button" className="btn btn-danger"
                  onClick={() => {
                    setImgUploaded(null);
                    const fileInput = document?.getElementById("imageInput") as HTMLInputElement;
                    fileInput.value = "";
                  }}>
                  Remove Image
                </button>
              )}
            </div>
          </div>

          { imgUploaded && (
            <div className="buttonContainer">
              <button type="button" className="btn btn-primary" onClick={processImage}>Remove BG</button>
            </div>
          )}

        </div>
      ) : (
        <>
          <div className="processedView">
            <div className="images">
              <div className="originalImageView">
                <img
                  alt="not found"
                  width={"200px"}
                  height={"300px"}
                  src={URL.createObjectURL(imgUploaded)}
                />
              </div>

              <div className="processedImageView">
                { isProcessing ? (
                  <div className="unsetImg d-flex align-items-center justify-content-center bg-light border border-secondary rounded shadow-sm">
                    <div className='loader' />
                  </div>
                ) : (
                  <img
                    alt="not found"
                    width={"200px"}
                    height={"300px"}
                    src={URL.createObjectURL(processedImg)}
                  />
                )}
              </div>
            </div>

            { processedImg && (
              <div className="actions">
                <button type="button" className="btn btn-primary"
                  onClick={() => {
                    setProcessedImg(null);
                    setImgUploaded(null);
                    setIsProcessing(false);
                  }}
                >
                  Remove Another BG
                </button>
                <button type="button" className="btn btn-success"
                  onClick={downloadImage}
                >
                  Download As PNG
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
    </>
  )

}

export default Removebg;
