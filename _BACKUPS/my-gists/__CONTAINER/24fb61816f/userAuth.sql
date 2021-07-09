SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `compositions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iduser` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '1',
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` smallint(6) NOT NULL,
  `bpm` smallint(6) NOT NULL,
  `beatsPerMeasure` tinyint(4) NOT NULL,
  `stepsPerBeat` tinyint(4) NOT NULL,
  `data` json NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `passwordForgotten` (
  `id` int(11) NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `thingsNotVerified` (
  `id` int(11) NOT NULL,
  `iduser` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailchecked` tinyint(1) NOT NULL DEFAULT '0',
  `emailpublic` tinyint(1) NOT NULL DEFAULT '0',
  `pass` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `lastname` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `username` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `compositions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `iduser` (`iduser`);

ALTER TABLE `passwordForgotten`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id` (`id`);

ALTER TABLE `thingsNotVerified`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `iduser` (`iduser`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `username` (`username`);


ALTER TABLE `passwordForgotten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `thingsNotVerified`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `compositions`
  ADD CONSTRAINT `compositions_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `users` (`id`);

ALTER TABLE `thingsNotVerified`
  ADD CONSTRAINT `thingsNotVerified_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `users` (`id`);
