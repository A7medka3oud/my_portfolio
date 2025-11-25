const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// قراءة بيانات الفورم
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ملفات الفرونت إند
app.use(express.static(path.join(__dirname, 'public')));

// ✅ إعداد SMTP الصحيح
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'a7medka3oud@gmail.com',      // ← ضع ايميلك
        pass: 'hwxvqmoshmhhvcoo'          // ← ضع App Password بدون مسافات
    }
});

// ------------------------------------------------------------
// 📩 استقبال طلب الإرسال
// ------------------------------------------------------------
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // إعداد الرسالة
        const mailOptions = {
            from: 'a7medka3oud@gmail.com',     // ← نفس ايميل الإرسال
            to: 'a7medka3oud@gmail.com',       // ← الإيميل الذي ستستقبل عليه الرسائل
            subject: `رسالة جديدة من ${name}: ${subject}`,
            html: `
                <h3>تفاصيل الرسالة</h3>
                <p><strong>الاسم:</strong> ${name}</p>
                <p><strong>الإيميل:</strong> ${email}</p>
                <p><strong>الهاتف:</strong> ${phone || 'غير متوفر'}</p>
                <p><strong>الموضوع:</strong> ${subject}</p>
                <hr>
                <p>${message}</p>
            `
        };

        // إرسال الإيميل
        await transporter.sendMail(mailOptions);

        res.send(`
            <div style="text-align:center; margin-top:50px; font-family: sans-serif;">
                <h1 style="color:green;">تم إرسال الرسالة بنجاح! ✔️</h1>
                <p>شكراً لتواصلك، سيتم الرد عليك قريباً.</p>
                <a href="/" style="font-size:20px; text-decoration:none;">العودة للصفحة الرئيسية</a>
            </div>
        `);


    } catch (error) {
        console.error("Email Error:", error);

       res.send(`
            <div style="text-align:center; margin-top:50px; font-family: sans-serif;">
                <h1 style="color:red;">حدث خطأ أثناء إرسال الرسالة ❌</h1>
                <p>من فضلك حاول مرة أخرى.</p>
                <a href="/" style="font-size:20px; text-decoration:none;">العودة للصفحة الرئيسية</a>
            </div>
        `);

    }
});

// ------------------------------------------------------------
// تشغيل السيرفر
// ------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});


