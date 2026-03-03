-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 03, 2026 at 04:21 PM
-- Server version: 8.0.45-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `transaction_tracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `transaction_tracking`
--

CREATE TABLE `transaction_tracking` (
  `id` int NOT NULL,
  `transaction_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `transaction_time` datetime NOT NULL,
  `device_info` varchar(50) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `risk_flag` tinyint(1) DEFAULT '0',
  `rule_triggered` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaction_tracking`
--

INSERT INTO `transaction_tracking` (`id`, `transaction_id`, `user_id`, `transaction_time`, `device_info`, `amount`, `risk_flag`, `rule_triggered`, `created_at`) VALUES
(3, 'TX001', 'U001', '2026-02-23 10:00:00', 'D1', 5000.00, 0, NULL, '2026-02-28 07:06:07'),
(4, 'TX002', 'U001', '2026-02-23 10:00:00', 'D1', 5000000.00, 1, 'HIGH_RISK', '2026-02-28 07:07:51'),
(5, 'TX005', 'U002', '2026-03-11 00:00:00', 'D4', 3333.00, 0, NULL, '2026-03-01 00:00:17'),
(7, 'TX006', 'U001', '2026-03-18 00:02:00', 'D4', 2222.00, 0, NULL, '2026-03-01 00:02:34'),
(8, 'TX007', 'U001', '2026-03-18 00:03:00', 'D4', 3333.00, 1, 'SUSPICIOUS', '2026-03-01 00:03:13'),
(9, 'TX011', 'U002', '2026-03-04 06:55:00', 'D4', 32155.00, 1, 'HIGH_RISK', '2026-03-01 06:55:44'),
(10, 'TX013', 'U001', '2026-03-03 16:59:00', 'D4', 3333.00, 1, 'SUSPICIOUS', '2026-03-01 17:02:41'),
(11, 'TX022', 'U001', '2026-03-05 17:36:00', 'D4', 434546.00, 1, 'HIGH_RISK', '2026-03-01 17:38:10'),
(12, 'TX033', 'U001', '2026-03-12 17:55:00', 'D4', 354.00, 1, 'SUSPICIOUS', '2026-03-01 18:33:54'),
(13, 'TX555', 'U001', '2026-03-04 18:45:00', 'D4', 111.00, 1, 'SUSPICIOUS', '2026-03-01 18:45:24'),
(14, 'TX030', 'U001', '2026-03-12 01:30:00', 'D4', 333.00, 1, 'SUSPICIOUS', '2026-03-02 11:36:49'),
(15, 'TX02000', 'U001', '2026-03-06 11:41:00', 'D4', 555.00, 1, 'SUSPICIOUS', '2026-03-02 11:48:21'),
(16, 'TX031', 'U034', '2026-03-11 11:51:00', 'D4', 222.00, 0, NULL, '2026-03-02 11:51:59'),
(17, 'TX250', 'U001', '2026-03-05 11:58:00', 'D4', 222.00, 1, 'SUSPICIOUS', '2026-03-02 11:59:56'),
(18, 'TX0233', 'U001', '2026-03-06 12:06:00', 'D4', 2222.00, 1, 'SUSPICIOUS', '2026-03-02 12:06:11'),
(19, 'TX123', 'U1001', '2026-02-23 10:00:00', 'D777', 25000.00, 1, 'HIGH_RISK', '2026-03-02 14:10:41'),
(20, 'TX11123', 'U1001', '2026-02-23 10:00:00', 'D777', 25000.00, 1, 'HIGH_RISK', '2026-03-02 14:19:06'),
(21, 'TX201', 'U1001', '2026-02-23 10:00:00', 'D7', 25000.00, 1, 'HIGH_RISK', '2026-03-02 20:46:02'),
(22, 'TX043', 'U023', '2026-03-04 11:27:00', 'D23', 4500.00, 0, NULL, '2026-03-03 11:28:03'),
(23, 'TX039', 'U001', '2026-03-05 16:21:00', 'D4', 333.00, 1, 'SUSPICIOUS', '2026-03-03 16:22:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transaction_tracking`
--
ALTER TABLE `transaction_tracking`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction_tracking`
--
ALTER TABLE `transaction_tracking`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
