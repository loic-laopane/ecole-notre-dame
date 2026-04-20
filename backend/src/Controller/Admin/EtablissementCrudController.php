<?php

namespace App\Controller\Admin;

use App\Entity\Etablissement;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ColorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class EtablissementCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string { return Etablissement::class; }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Établissement')
            ->setEntityLabelInPlural('Établissements')
            ->setDefaultSort(['position' => 'ASC'])
            ->setSearchFields(['name', 'excerpt', 'content']);
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield BooleanField::new('actif', 'Actif')->renderAsSwitch(true);
        yield TextField::new('name', 'Nom');
        yield SlugField::new('slug')->setTargetFieldName('name')->hideOnIndex();
        yield ChoiceField::new('niveau', 'Niveau')->setChoices(Etablissement::NIVEAUX);
        yield IntegerField::new('position', 'Ordre d\'affichage')->setHelp('0 = en premier');
        yield TextField::new('excerpt', 'Résumé court')->hideOnIndex();
        yield TextareaField::new('content', 'Contenu')->hideOnIndex()->setNumOfRows(10);
        yield TextField::new('address', 'Adresse')->hideOnIndex();
        yield TextField::new('city', 'Ville')->hideOnIndex();
        yield TextField::new('phone', 'Téléphone')->hideOnIndex();
        yield TextField::new('email', 'Email')->hideOnIndex();
        yield ColorField::new('colorDot', 'Couleur')->hideOnIndex();
        yield TextField::new('icon', 'Icône (emoji)')->hideOnIndex()->setHelp('Ex: 🎓');
        yield ImageField::new('featuredImage', 'Image')
            ->setBasePath('/uploads/etablissements')
            ->setUploadDir('public/uploads/etablissements')
            ->hideOnIndex();
    }
}
