CREATE TABLE CARS(
	CAR_ID INT PRIMARY KEY AUTO_INCREMENT,
	-- Tên xe, ví dụ: "Tesla Model S"
   `name` VARCHAR(255),
   -- Mô tả ngắn, ví dụ: "Free recharge at any station"
   description TEXT,
   -- Số lượng hành khách, ví dụ: 4
   passengers INT,
   -- Tốc độ tối đa với thời gian tăng tốc, ví dụ: "100 km/h in 4 seconds"
   max_speed VARCHAR(255),
   -- Loại hộp số, ví dụ: "Automatic gearbox"
   gearbox_type VARCHAR(255),
   -- Loại nhiên liệu, ví dụ: "Electric"
   fuel_type VARCHAR(255),
   -- Giá thuê mỗi ngày, ví dụ: 168.00
   price_per_day DOUBLE,
   -- Tỷ lệ giảm giá, ví dụ: 25
   discount_percentage INT DEFAULT 0,
   -- URL hình ảnh xe
   image_url VARCHAR(255),
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)









