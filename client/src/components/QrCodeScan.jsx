import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QrFrame from "/assests/qr-frame.svg";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function QrCodeScan() {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const qrFileUploadRef = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const navigate = useNavigate();
  const [imageBlob, setImageBlob] = useState(null);
  const [IsEnterCode, setIsEnterCode] = useState(false);
  const [qrCodeEntered, setQrCodeEntered] = useState(null);
  // Success Qr Scan
  const onScanSuccess = (result) => {
    const qrCodeId = result?.data?.split("/")?.pop() || result?.split("/")?.pop();
    navigate(`/update-qrcode/${qrCodeId}`);
  };

  // Fail Qr Scan
  const onScanFail = (err) => {
    // console.log(err);
  };
  function handleQrInputChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Convert the uploaded image to a Blob
      const blob = new Blob([reader.result], { type: file.type });
      setImageBlob(blob);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }
  useEffect(() => {
    if (imageBlob) {
      QrScanner.scanImage(imageBlob)
        .then((result) => onScanSuccess(result))
        .catch((error) => console.log(error || "No QR code found 1."));
    }
  }, [imageBlob]);

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => {
          setQrOn(true);
        })
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, [IsEnterCode]);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
      navigate("/", { replace: "true" });
    }
  }, [qrOn]);
  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Scan Qr Code</CardTitle>
        <CardDescription>Scan,upload or enter Qr Code Id.</CardDescription>
      </CardHeader>
      <CardContent>
        {!IsEnterCode ? (
          <div className="qr-reader relative h-96 flex justify-center items-center">
            {/* QR */}
            <video
              className="absolute w-full h-full object-cover"
              ref={videoEl}
            ></video>
            <div ref={qrBoxEl} className="qr-box w-full left-0">
              <img
                src={QrFrame}
                alt="Qr Frame"
                width={256}
                height={256}
                className="qr-frame absolute w-full fill-none left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="qrCodeId">Qr Code Id</Label>
            <Input
              id="qrCodeId"
              name="qrCodeId"
              value={qrCodeEntered}
              onChange={(e) => setQrCodeEntered(e.target.value)}
              placeholder="Enter Qr code Id"
              required
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setIsEnterCode((prev) => !prev)}
        >
          {IsEnterCode ? "Scan Qr" : "Enter Code"}
        </Button>

        {IsEnterCode ? (
          <Button
            onClick={() => {
              if (qrCodeEntered) {
                navigate(`/update-qrcode/${qrCodeEntered}`);
              }
            }}
          >
            Submit
          </Button>
        ) : (
          <Button onClick={() => qrFileUploadRef.current.click()}>
            Upload Qr
            <input
              onChange={handleQrInputChange}
              className="hidden"
              ref={qrFileUploadRef}
              type="file"
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
