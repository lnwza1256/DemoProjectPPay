/**
 * คำนวณ CRC-16-CCITT (False) สำหรับข้อมูลที่กำหนด
 * @param {Uint8Array} data 
 * @returns {number}
 */
function calculateCrc16CcittFalse(data) {
    let crc = 0xFFFF;

    const polynomial = 0x1021;

    for (let i = 0; i < data.length; i++) {
        crc ^= (data[i] << 8);

        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) { 
                crc = (crc << 1) ^ polynomial;
            } else {
                crc = crc << 1;
            }
        }
    }

    return crc & 0xFFFF; // Ensure it's a 16-bit value
}


function stringToUint8Array(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}


let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let output = document.getElementById('output');

function Convert() {
    const phonenum = input1.value;
    const amount = input2.value;
    let A1 = "00020101021229370016A00000067701011101130066"
    let A2 = phonenum.slice(1);
    let A3 = "53037645405";
    let A4 = amount + "5802TH6304";
    let A5 = A1 + A2 + A3 + A4;
    let A6 = A5
    
    const qrDataString = A6 ;
    const dataBytes = stringToUint8Array(qrDataString);
    const calculatedCrc = calculateCrc16CcittFalse(dataBytes);
    let A7 =(`0x${calculatedCrc.toString(16).toUpperCase()}`)
    let A8 = qrDataString + A7.slice(2);
   

const emv = A8;
    console.log(emv)

    const text = emv
fetch("https://c338-103-239-101-114.ngrok-free.app/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: text })
            })
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                document.getElementById("preview").src = url;
            })
            .catch(error => {
                console.error("เกิดข้อผิดพลาด:", error);
            });
        }
    
