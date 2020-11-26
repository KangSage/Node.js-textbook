CREATE SCHEMA `nodejs` DEFAULT CHARACTER SET utf8;

use nodejs;

# user table

CREATE TABLE nodejs.user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT UNSIGNED NOT NULL,
    married TINYINT NOT NULL,
    comment TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    UNIQUE INDEX name_UNIQUE (name ASC)
 )
    COMMENT = '사용자 정보'
    DEFAULT CHARACTER SET = utf8
    ENGINE = InnoDB;

DESC users;

# 사용자의 댓글 저장 테이블

CREATE TABLE nodejs.comments (
    id INT NOT NULL AUTO_INCREMENT,
    commenter INT NOT NULL,
    comment VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    INDEX commenter_idx (commenter ASC),
    CONSTRAINT commenter
    FOREIGN KEY (commenter)
    REFERENCES nodejs.users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) COMMENT = '댓글'
DEFAULT CHARSET = utf8mb4
ENGINE = InnoDB;

SHOW TABLES;
