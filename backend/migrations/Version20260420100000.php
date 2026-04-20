<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260420100000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Ajout du champ actif sur l\'établissement';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE etablissement ADD actif BOOLEAN DEFAULT true NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE etablissement DROP COLUMN actif');
    }
}
