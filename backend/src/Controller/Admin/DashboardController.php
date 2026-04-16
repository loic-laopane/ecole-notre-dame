<?php

namespace App\Controller\Admin;

use App\Entity\Actualite;
use App\Entity\Etablissement;
use App\Entity\Evenement;
use App\Entity\User;
use App\Repository\ActualiteRepository;
use App\Repository\EvenementRepository;
use App\Repository\EtablissementRepository;
use App\Repository\UserRepository;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DashboardController extends AbstractDashboardController
{
    public function __construct(
        private ActualiteRepository    $actualites,
        private EvenementRepository    $evenements,
        private EtablissementRepository $etablissements,
        private UserRepository         $users,
    ) {}

    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig', [
            'stats' => [
                'actualites'    => $this->actualites->count([]),
                'publiees'      => $this->actualites->count(['published' => true]),
                'evenements'    => $this->evenements->count([]),
                'etablissements'=> $this->etablissements->count([]),
                'users'         => $this->users->count([]),
            ],
            'recentes' => $this->actualites->findBy([], ['createdAt' => 'DESC'], 5),
            'prochains' => $this->evenements->findBy(['published' => true], ['eventDate' => 'ASC'], 5),
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Notre-Dame Saint-Louis')
            ->setFaviconPath('/favicon.ico')
            ->setTranslationDomain('admin')
            ->renderContentMaximized();
    }

    public function configureAssets(): Assets
    {
        return Assets::new()->addCssFile('/css/admin.css');
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
