<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string { return User::class; }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Utilisateur')
            ->setEntityLabelInPlural('Utilisateurs')
            ->setDefaultSort(['createdAt' => 'DESC'])
            ->setSearchFields(['email', 'firstName', 'lastName'])
            ->showEntityActionsInlined();
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->disable(Action::NEW)
            ->add(Crud::PAGE_INDEX, Action::DETAIL);
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield EmailField::new('email', 'Email');
        yield TextField::new('firstName', 'Prénom');
        yield TextField::new('lastName', 'Nom');
        yield ChoiceField::new('roles', 'Rôles')
            ->setChoices([
                'Utilisateur'    => User::ROLE_USER,
                'Parent'         => User::ROLE_PARENT,
                'Administrateur' => User::ROLE_ADMIN,
                'Super Admin'    => User::ROLE_SUPER_ADMIN,
            ])
            ->allowMultipleChoices()
            ->renderAsBadges([
                User::ROLE_SUPER_ADMIN => 'danger',
                User::ROLE_ADMIN       => 'warning',
                User::ROLE_PARENT      => 'info',
                User::ROLE_USER        => 'secondary',
            ]);
        yield TextField::new('oauthProvider', 'Connexion via')->hideOnForm();
        yield DateTimeField::new('createdAt', 'Inscrit le')->hideOnForm()->setFormat('dd/MM/yyyy HH:mm');
        yield DateTimeField::new('lastLoginAt', 'Dernière connexion')->hideOnForm()->setFormat('dd/MM/yyyy HH:mm');
    }
}
