const { Zalo } = require("zca-js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Tạo web server ảo để duy trì hoạt động 24/7 trên Render
app.get("/", (req, res) => {
  res.send("Bot Zalo FF đang hoạt động bình thường!");
});

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});


async function startBot() {
  try {
    // Lấy Cookie từ biến môi trường trên Render (bảo mật tuyệt đối)
    const cookie = process.env.ZALO_COOKIE;
    if (!cookie) {
      console.log("Lỗi: Chưa cấu hình ZALO_COOKIE trong Environment Variables!");
      return;
    }

    const zalo = new Zalo({ cookie: cookie });
    console.log("Đang kết nối tới tài khoản Zalo...");

    // Lắng nghe sự kiện tin nhắn đến
    zalo.listen({
      onMessage: async (message) => {
        try {
          // Kiểm tra nếu có tin nhắn là hình ảnh được gửi vào nhóm chat
          if (message.type === "image" && message.isGroup) {
            console.log("Đã nhận được ảnh kết quả trận đấu từ nhóm!");
            
            // Phản hồi tự động ngay lập tức vào nhóm
            await message.reply("Đã nhận ảnh bảng kết quả! Bot đang tiến hành đọc điểm...");
          }
        } catch (err) {
          console.error("Lỗi khi xử lý tin nhắn:", err);
        }
      }
    });

  } catch (error) {
    console.error("Không thể khởi động bot:", error);
  }
}

startBot();
