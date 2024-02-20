-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_it
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryid` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (7,'Book','Not Digital.'),(8,'Laptop','Light and high performance laptops for school.'),(10,'Video Games','Can be installed on your laptop.');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `categoryid` int NOT NULL,
  `brand` varchar(45) NOT NULL,
  `price` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`productid`),
  KEY `categoryid_idx` (`categoryid`),
  CONSTRAINT `categoryid_product` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (8,'AMD Ryzen 3600 Laptop','Best Laptop',8,'AMD',1855.5,'2022-02-06 20:07:38'),(9,'Art of War','Written by Sun Tzu',7,'SP IT!',26.99,'2022-02-06 20:28:49'),(10,'The Catcher in the Rye','Novel by J. D. Salinger',7,'SP IT!',14.99,'2022-02-06 20:33:15'),(11,'Cyberpunk 2077','Cyberpunk 2077 is an action role-playing video game developed and published by CD Projekt.',10,'CD Project Red',59.99,'2022-02-06 22:40:13'),(12,'The Witcher 3: Wild Hunt','he Witcher 3: Wild Hunt is an action role-playing game developed by Polish developer CD Projekt Red.',10,'CD Project Red',29.99,'2022-02-06 22:40:13');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `promotionid` int NOT NULL AUTO_INCREMENT,
  `promotion_start` date NOT NULL,
  `promotion_end` date NOT NULL,
  `discount` double NOT NULL,
  `productid` int NOT NULL,
  PRIMARY KEY (`promotionid`),
  KEY `productid_promotion_idx` (`productid`),
  CONSTRAINT `productid_promotion` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewsid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `productid` int NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewsid`),
  KEY `userid_idx` (`userid`),
  KEY `productid_idx` (`productid`),
  CONSTRAINT `productid_reviews` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE,
  CONSTRAINT `userid_reviews` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (14,5,8,4,'Not bad. Pretty fast.','2022-02-06 22:46:12'),(15,6,9,5,'Brilliant!','2022-02-06 22:46:12'),(16,7,9,5,'“In the midst of chaos, there is also opportunity.” -Sun Tzu','2022-02-06 22:46:12'),(17,7,10,5,'One of my favourite books.','2022-02-06 22:46:12'),(18,5,11,3,'Pretty disappointing.','2022-02-06 22:46:12'),(19,6,11,2,'A ton of bugs!','2022-02-06 22:46:12'),(20,5,12,4,'Triss<3','2022-02-06 22:46:12'),(21,7,12,5,'One of the best RPGs of all time.','2022-02-06 22:46:12');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contact` int NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `profile_pic_url` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'u2','u2@test.com',12345678,'p2','Customer','https://www.abc.com/u2.jpg','2022-01-02 17:54:37'),(4,'u4','u4@test.com',34545455,'p4','Admin','https://www.abc.com/u4.jpg','2022-02-06 16:27:46'),(5,'John','john@test.com',57834532,'john','Customer','https://www.abc.com/john.jpg','2022-02-06 22:37:46'),(6,'Sally','sally@test.com',54328900,'sally','Customer','https://www.abc.com/sally.jpg','2022-02-06 22:37:46'),(7,'George','george@test.com',78993456,'george','Admin','https://www.abc.com/george.jpg','2022-02-06 22:37:46');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinterests`
--

DROP TABLE IF EXISTS `userinterests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinterests` (
  `userInterstsid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `categoryid` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userInterstsid`),
  KEY `userid_idx` (`userid`),
  KEY `categoryid_idx` (`categoryid`),
  CONSTRAINT `categoryid_interest` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE,
  CONSTRAINT `userid_interest` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinterests`
--

LOCK TABLES `userinterests` WRITE;
/*!40000 ALTER TABLE `userinterests` DISABLE KEYS */;
INSERT INTO `userinterests` VALUES (49,4,7,'2022-02-06 22:24:28'),(50,4,8,'2022-02-06 22:24:28'),(51,4,10,'2022-02-06 22:24:28');
/*!40000 ALTER TABLE `userinterests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-07  7:40:38
