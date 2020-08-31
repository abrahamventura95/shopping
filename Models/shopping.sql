-- MySQL Script generated by MySQL Workbench 
-- Tue Aug 25 13:25:04 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema shopping
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shopping
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shopping` DEFAULT CHARACTER SET utf8 ;
USE `shopping` ;

-- -----------------------------------------------------
-- Table `shopping`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NULL,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `type` ENUM('shop', 'user', 'admin') NOT NULL DEFAULT 'user',
  `rif` VARCHAR(45) NULL,
  `balance` INT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `shopping`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shop` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `image` VARCHAR(64) NULL,
  `amount` INT NOT NULL DEFAULT 0,
  `price` FLOAT NOT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `product_shop`
    FOREIGN KEY (`shop`)
    REFERENCES `shopping`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`offer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`offer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` BIT NOT NULL DEFAULT 1,
  `price` FLOAT NOT NULL DEFAULT 0,
  `until` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`prdtByCtg`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`prdtByCtg` (
  `product_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `category_id`),
  CONSTRAINT `fk_product_has_category_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `shopping`.`product` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_has_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `shopping`.`category` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`prdtByoffer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`prdtByoffer` (
  `product_id` INT NOT NULL,
  `offer_id` INT NOT NULL,
  `amount` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`product_id`, `offer_id`),
  CONSTRAINT `fk_product_has_offer_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `shopping`.`product` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_has_offer_offer1`
    FOREIGN KEY (`offer_id`)
    REFERENCES `shopping`.`offer` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`recharge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`recharge` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NULL,
  `admin` INT NULL,
  `img` VARCHAR(45) NOT NULL,
  `status` BIT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `admin_verified`
    FOREIGN KEY (`admin`)
    REFERENCES `shopping`.`user` (`id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
  CONSTRAINT `user_recharge`
    FOREIGN KEY (`user`)
    REFERENCES `shopping`.`user` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`shoppingChart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`shoppingChart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `status` BIT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `shoppingcart_user`
    FOREIGN KEY (`user`)
    REFERENCES `shopping`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`cartproduct`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`cartproduct` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cart` INT NOT NULL,
  `product` INT NOT NULL,
  `amount` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `product_cart`
    FOREIGN KEY (`product`)
    REFERENCES `shopping`.`product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `cart_shopping`
    FOREIGN KEY (`cart`)
    REFERENCES `shopping`.`shoppingChart` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`cartOffer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`cartOffer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cart` INT NOT NULL,
  `offer` INT NOT NULL,
  `amount` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `offer_pk`
    FOREIGN KEY (`offer`)
    REFERENCES `shopping`.`offer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `shopping_pk`
    FOREIGN KEY (`cart`)
    REFERENCES `shopping`.`shoppingChart` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`purchcart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`purchcart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`prdctpurch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`prdctpurch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `purchcart` INT NULL,
  `shop` INT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `amount` INT NULL,
  `price` FLOAT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_prdct_cart`
    FOREIGN KEY (`purchcart`)
    REFERENCES `shopping`.`purchcart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`offerpurch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`offerpurch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `purchcart` INT NULL,
  `offer` INT NULL,
  `price` FLOAT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pc`
    FOREIGN KEY (`purchcart`)
    REFERENCES `shopping`.`purchcart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shopping`.`offerpdctpurch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`offerpdctpurch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `offerpurch` INT NULL,
  `shop` INT NULL,
  `idcart` INT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_offerpurch`
    FOREIGN KEY (`offerpurch`)
    REFERENCES `shopping`.`offerpurch` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `shopping`;

DELIMITER $$
USE `shopping`$$
CREATE DEFINER = CURRENT_USER TRIGGER `shopping`.`shoppingChart_AFTER_UPDATE` AFTER UPDATE ON `shoppingChart` FOR EACH ROW
BEGIN
	IF new.status = true THEN
		INSERT INTO purchcart(`id`,`user`) VALUES(old.id,old.user);
        INSERT INTO prdctpurch(purchcart,shop,name,description,amount,price) 
							SELECT chart.id, p.shop, p.name, p.description, cartproduct.amount, p.price 
                            FROM product as p, cartproduct, (SELECT * FROM purchcart WHERE id = old.id) as chart
                            WHERE p.id = cartproduct.product AND
								                  cartproduct.cart = old.id;
         INSERT INTO offerpurch(purchcart,offer,price) 
							SELECT chart.id, o.id, o.price 
                            FROM offer as o, cartOffer, (SELECT * FROM purchcart WHERE id = old.id) as chart
                            WHERE o.id = cartOffer.offer AND
								                  cartOffer.cart = old.id;
          INSERT INTO offerpdctpurch(offerpurch,shop,name,description)
							SELECT op.id, p.shop, p.name, p.description 
                            FROM product as p, prdtByOffer as po, offer as o, cartOffer as co, (SELECT offerpurch.* FROM offerpurch, purchcart WHERE offerpurch.purchcart = purchcart.id AND purchcart.id = old.id) as op
                            WHERE p.id = po.product_id AND
								                  po.offer_id = o.id	   AND
                                  co.offer = o.id	     AND
                                  co.cart = old.id;
  END IF;                        
END$$


DELIMITER ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `buy`(IN id INT)
BEGIN
DECLARE cart INT; 
DECLARE balance FLOAT;
DECLARE totalProducts FLOAT;
DECLARE totalOffer FLOAT;
DECLARE products INT;
DECLARE idProduct INT;
DECLARE amountNeed INT;
DECLARE amountIS INT;
DECLARE i INT default 0;

  start transaction;
    SELECT `shoppingchart`.`id` INTO cart 
      FROM `shoppingchart` 
      WHERE `shoppingchart`.`user` = id AND
          `shoppingchart`.`status` = FALSE
      LIMIT 1;
    SELECT `user`.`balance` INTO balance
      FROM `user`
            WHERE `user`.`id` = id;
    SELECT SUM(`cartproduct`.`amount` * `product`.`price`) INTO totalProducts
      FROM `cartproduct`, `product`
            WHERE   `cartproduct`.`product` = `product`.`id` AND
          `cartproduct`.`cart` = cart;
        SELECT SUM(`offer`.`price`) INTO totalOffer
      FROM `cartOffer`, `offer`
            WHERE   `offer`.`id` = `cartOffer`.`offer` AND 
          `cartOffer`.`cart` = cart;
    IF (balance >= totalProducts + totalOffer) THEN
      SELECT COUNT(`id`) INTO products 
        FROM `cartproduct` 
                WHERE `cart` = cart;    
            WHILE i < products DO 
        SELECT `product`.`id`, `product`.`amount`, `cartproduct`.`amount` INTO idProduct, amountIS, amountNeed
          FROM `product`, `cartproduct`
                    WHERE `cartproduct`.`product` = `product`.`id` AND
                        `cartproduct`.`cart` = cart
                    LIMIT i,1;
        IF ( amountNeed <= amountIS ) THEN
          UPDATE `product` SET
               `product`.`amount` = amountIS - amountNeed
          WHERE `product`.`id` = idProduct;
                ELSE
          ROLLBACK;
        END IF; 
                SELECT i + 1 INTO i;
            END WHILE;
            SELECT 0 INTO i;
            SELECT COUNT(`product`.`id`) INTO products
        FROM `product`, `prdtByoffer`, `offer`, `cartOffer`
                WHERE `product`.`id` = `prdtByoffer`.`product_id` AND
            `prdtByoffer`.`offer_id` = `offer`.`id`     AND
                      `offer`.`id` = `cartOffer`.`offer`      AND
                      `cartOffer`.`cart` = cart;
            WHILE i < products DO          
        SELECT `product`.`id`, `product`.`amount`, `prdtByoffer`.`amount` INTO idProduct, amountIS, amountNeed
          FROM `product`, `prdtByoffer`, `offer`, `cartOffer`
          WHERE `product`.`id` = `prdtByoffer`.`product_id` AND
              `prdtByoffer`.`offer_id` = `offer`.`id`     AND
              `offer`.`id` = `cartOffer`.`offer`      AND
              `cartOffer`.`cart` = cart 
          LIMIT i,1;
                 IF ( amountNeed <= amountIS ) THEN
          UPDATE `product` SET
               `product`.`amount` = amountIS - amountNeed
          WHERE `product`.`id` = idProduct;
                ELSE
          ROLLBACK;
        END IF; 
                SELECT i + 1 INTO i;
            END WHILE; 
            UPDATE `user` SET
          `balance` = balance - (totalProducts + totalOffer)
            WHERE `id` = id
            LIMIT 1;     
            UPDATE `shoppingchart` SET
          `shoppingchart`.`status` = TRUE
      WHERE `shoppingchart`.`id` = cart;
            COMMIT;
        ELSE 
      ROLLBACK;
        END IF;    
END$$

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
