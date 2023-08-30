document.getElementById('generatePDFButton').addEventListener('click', function() {
    var certificateImage = new Image();
    certificateImage.src = '../images/certificate.png';

    certificateImage.onload = function() {
        var pdfWidth = certificateImage.width - 0;
        var pdfHeight = certificateImage.height-0;

        var pdf = new jsPDF({
            orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
            unit: 'px',
            format: [pdfWidth, pdfHeight]
        });

        pdf.addImage(certificateImage, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.setFontSize(300);
        pdf.setFont('times');
        pdf.setTextColor(23,56,77);
        var counterString = window.counter.toString();
        if(window.counter < 10){
            pdf.text(counterString, pdfWidth / 2.5, pdfHeight / 1.77, { align: 'center' });
        }
        else{
            pdf.text(counterString, pdfWidth / 2.9, pdfHeight / 1.77, { align: 'center' });
        }
        pdf.save('certifikat.pdf');
    };
});