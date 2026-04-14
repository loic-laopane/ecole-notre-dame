<?php

namespace App\Controller\Admin;

use App\Entity\Actualite;
use App\Entity\Etablissement;
use App\Entity\Evenement;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('<img src="/images/logo.png" alt="NDSL" style="height:40px">')
            ->setFaviconPath('/favicon.ico')
            ->setTranslationDomain('admin')
            ->renderContentMaximized();
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Tableau de bord', 'fa fa-home');

        yield MenuItem::section('Contenu');
        yield MenuItem::linkToCrud('Actualités',     'fa fa-newspaper',  Actualite::class);
        yield MenuItem::linkToCrud('Événements',     'fa fa-calendar',   Evenement::class);
        yield MenuItem::linkToCrud('Établissements', 'fa fa-building',   Etablissement::class);

        yield MenuItem::section('Utilisateurs');
        yield MenuItem::linkToCrud('Utilisateurs', 'fa fa-users', User::class);

        yield MenuItem::section('Outils');
        yield MenuItem::linkToUrl('Voir le site',    'fa fa-globe',      '/');
        yield MenuItem::linkToUrl('Documentation API', 'fa fa-book',     '/api/docs');
    }
}
