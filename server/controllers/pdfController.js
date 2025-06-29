const pdf = require('html-pdf');

exports.generatePDF = async (req, res) => {
  try {
    const { html } = req.body;
    
    const options = {
      format: 'A4',
      border: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      phantomPath: process.env.PHANTOMJS_PATH || null
    };
    
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('PDF generation error:', err);
        return res.status(500).json({ error: 'Failed to generate PDF' });
      }
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      res.send(buffer);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};