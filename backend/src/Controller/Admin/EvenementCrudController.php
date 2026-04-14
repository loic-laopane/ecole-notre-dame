<?php

namespace App\Controller\Admin;

use App\Entity\Evenement;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class EvenementCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string { return Evenement::class; }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Événement')
            ->setEntityLabelInPlural('Événements')
            ->setDefaultSort(['eventDate' => 'ASC']);
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('title', 'Titre');
        yield SlugField::new('slug')->setTargetFieldName('title')->hideOnIndex();
        yield DateField::new('eventDate', 'Date');
        yield TextField::new('eventTime', 'Heure')->setHelp('Ex: 9h – 12h');
        yield TextField::new('location', 'Lieu');
        yield ChoiceField::new('type', 'Type')->setChoices([
            'Événement'  => 'evenement',
            'Pastorale'  => 'pastorale',
            'Calendrier' => 'calendrier',
            'Résultats'  => 'resultats',
        ]);
        yield ChoiceField::new('etablissement', 'Établissement')->setChoices([
            'Tous'        => 'tous',
            'Maternelle'  => 'maternelle',
            'Élémentaire' => 'elementaire',
            'Collège'     => 'college',
            'Lycée'       => 'lycee',
        ])->hideOnIndex();
        yield TextareaField::new('description', 'Description')->hideOnIndex();
        yield BooleanField::new('published', 'Publié');
    }
}
