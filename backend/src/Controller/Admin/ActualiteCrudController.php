<?php

namespace App\Controller\Admin;

use App\Entity\Actualite;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\BooleanFilter;
use EasyCorp\Bundle\EasyAdminBundle\Filter\ChoiceFilter;

class ActualiteCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string { return Actualite::class; }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Actualité')
            ->setEntityLabelInPlural('Actualités')
            ->setDefaultSort(['publishedAt' => 'DESC'])
            ->setSearchFields(['title', 'excerpt', 'content']);
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('title', 'Titre');
        yield SlugField::new('slug')->setTargetFieldName('title')->hideOnIndex();
        yield ChoiceField::new('category', 'Catégorie')->setChoices([
            'Événement'  => 'evenement',
            'Pastorale'  => 'pastorale',
            'Résultats'  => 'resultats',
            'Vie scolaire' => 'vie-scolaire',
            'Sport'      => 'sport',
            'Culture'    => 'culture',
        ])->allowMultipleChoices(false);
        yield ChoiceField::new('niveau', 'Établissement')->setChoices([
            'Maternelle'  => 'maternelle',
            'Élémentaire' => 'elementaire',
            'Collège'     => 'college',
            'Lycée'       => 'lycee',
            'Tous'        => 'tous',
        ])->hideOnIndex();
        yield TextareaField::new('excerpt', 'Résumé')->hideOnIndex();
        yield TextareaField::new('content', 'Contenu (HTML)')->hideOnIndex()->setNumOfRows(15);
        yield ImageField::new('featuredImage', 'Image à la une')
            ->setBasePath('/uploads/actualites')
            ->setUploadDir('public/uploads/actualites')
            ->hideOnIndex();
        yield BooleanField::new('published', 'Publié');
        yield DateTimeField::new('publishedAt', 'Date de publication')->hideOnForm();
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add(BooleanFilter::new('published', 'Publié'))
            ->add(ChoiceFilter::new('category', 'Catégorie')->setChoices([
                'Événement' => 'evenement',
                'Pastorale' => 'pastorale',
            ]));
    }
}
