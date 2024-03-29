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

export function QrCodeScan() {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const navigate = useNavigate();

  // Success Qr Scan
  const onScanSuccess = (result) => {
    const qrCodeId = result?.data.split("/")?.pop();
    navigate(`/update-qrcode/${qrCodeId}`);
  };

  // Fail Qr Scan
  const onScanFail = (err) => {
    console.log(err);
  };

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
  }, []);

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
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
