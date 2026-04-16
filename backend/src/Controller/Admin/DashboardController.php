<?php

namespace App\Controller\Admin;

use App\Controller\Admin\Page\CdiCrudController;
use App\Controller\Admin\Page\CollegeCrudController;
use App\Controller\Admin\Page\InfosPratiquesCrudController;
use App\Controller\Admin\Page\LyceeCrudController;
use App\Controller\Admin\Page\PastoraleCrudController;
use App\Controller\Admin\Page\VieScolaireCrudController;
use App\Entity\Actualite;
use App\Entity\Etablissement;
use App\Entity\Evenement;
use App\Entity\Page;
use App\Entity\User;
use App\Repository\ActualiteRepository;
use App\Repository\EtablissementRepository;
use App\Repository\EvenementRepository;
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
        private ActualiteRepository     $actualites,
        private EvenementRepository     $evenements,
        private EtablissementRepository $etablissements,
        private UserRepository          $users,
    ) {}

    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig', [
            'stats' => [
                'actualites'     => $this->actualites->count([]),
                'publiees'       => $this->actualites->count(['published' => true]),
                'evenements'     => $this->evenements->count([]),
                'etablissements' => $this->etablissements->count([]),
                'users'          => $this->users->count([]),
            ],
            'recentes'  => $this->actualites->findBy([], ['createdAt' => 'DESC'], 5),
            'prochains' => $this->evenements->findBy(['published' => true], ['eventDate' => 'ASC'], 5),
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('<img src="/images/logo.png" alt="NDSL" style="height:36px"> <span style="font-family:\'Cormorant Garamond\',serif;font-size:1.1rem;color:#fff;vertical-align:middle;margin-left:.5rem;">Notre-Dame Saint-Louis</span>')
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

        // ── Contenu dynamique ──────────────────────────────────────
        yield MenuItem::section('Contenu');
        yield MenuItem::linkToCrud('Actualités',     'fa fa-newspaper',  Actualite::class);
        yield MenuItem::linkToCrud('Événements',     'fa fa-calendar',   Evenement::class);
        yield MenuItem::linkToCrud('Établissements', 'fa fa-building',   Etablissement::class);

        // ── Pages du site ──────────────────────────────────────────
        yield MenuItem::section('Pages du site');

        yield MenuItem::subMenu('Infos pratiques', 'fa fa-info-circle')->setSubItems([
            MenuItem::linkToCrud('Toutes les pages', 'fa fa-list', Page::class)
                ->setController(InfosPratiquesCrudController::class),
            MenuItem::linkToCrud('Documents de rentrée', 'fa fa-file-alt', Page::class)
                ->setController(InfosPratiquesCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'documents-de-rentree'),
            MenuItem::linkToCrud('Horaires', 'fa fa-clock', Page::class)
                ->setController(InfosPratiquesCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'horaires'),
            MenuItem::linkToCrud('Accès', 'fa fa-map-marker-alt', Page::class)
                ->setController(InfosPratiquesCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'acces'),
            MenuItem::linkToCrud('Inscriptions', 'fa fa-pen', Page::class)
                ->setController(InfosPratiquesCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'inscriptions'),
        ]);

        yield MenuItem::subMenu('Collège', 'fa fa-graduation-cap')->setSubItems([
            MenuItem::linkToCrud('Toutes les pages', 'fa fa-list', Page::class)
                ->setController(CollegeCrudController::class),
            MenuItem::linkToCrud('Équipe éducative', 'fa fa-users', Page::class)
                ->setController(CollegeCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'equipe-educative'),
            MenuItem::linkToCrud('Organisation', 'fa fa-sitemap', Page::class)
                ->setController(CollegeCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'organisation'),
            MenuItem::linkToCrud('Inscription AS', 'fa fa-running', Page::class)
                ->setController(CollegeCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'inscription-as'),
        ]);

        yield MenuItem::subMenu('Lycée', 'fa fa-university')->setSubItems([
            MenuItem::linkToCrud('Toutes les pages', 'fa fa-list', Page::class)
                ->setController(LyceeCrudController::class),
            MenuItem::linkToCrud('Équipe éducative', 'fa fa-users', Page::class)
                ->setController(LyceeCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'equipe-educative'),
            MenuItem::linkToCrud('Seconde', 'fa fa-book', Page::class)
                ->setController(LyceeCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'seconde'),
            MenuItem::linkToCrud('Orientation', 'fa fa-compass', Page::class)
                ->setController(LyceeCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'orientation'),
            MenuItem::linkToCrud('FCE / Espagnol', 'fa fa-globe', Page::class)
                ->setController(LyceeCrudController::class),
        ]);

        yield MenuItem::subMenu('Pastorale', 'fa fa-church')->setSubItems([
            MenuItem::linkToCrud('Toutes les pages', 'fa fa-list', Page::class)
                ->setController(PastoraleCrudController::class),
            MenuItem::linkToCrud('Célébrations', 'fa fa-star', Page::class)
                ->setController(PastoraleCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'celebrations'),
            MenuItem::linkToCrud('Culture', 'fa fa-palette', Page::class)
                ->setController(PastoraleCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'culture'),
            MenuItem::linkToCrud('Engagement', 'fa fa-hands-helping', Page::class)
                ->setController(PastoraleCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'engagement'),
        ]);

        yield MenuItem::subMenu('CDI', 'fa fa-book-open')->setSubItems([
            MenuItem::linkToCrud('CDI Collège', 'fa fa-book', Page::class)
                ->setController(CdiCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'college'),
            MenuItem::linkToCrud('CDI Lycée', 'fa fa-book', Page::class)
                ->setController(CdiCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'lycee'),
        ]);

        yield MenuItem::subMenu('Vie scolaire', 'fa fa-futbol')->setSubItems([
            MenuItem::linkToCrud('AS & Ateliers', 'fa fa-running', Page::class)
                ->setController(VieScolaireCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'as-ateliers'),
            MenuItem::linkToCrud('Albums photos', 'fa fa-images', Page::class)
                ->setController(VieScolaireCrudController::class)
                ->setQueryParameter('filters[subsection][value]', 'albums-photos'),
        ]);

        // ── Administration ─────────────────────────────────────────
        yield MenuItem::section('Administration');
        yield MenuItem::linkToCrud('Utilisateurs', 'fa fa-users', User::class);

        yield MenuItem::section('');
        yield MenuItem::linkToUrl('Voir le site',      'fa fa-globe', 'http://localhost:3002')->setLinkTarget('_blank');
        yield MenuItem::linkToUrl('Documentation API', 'fa fa-code',  '/api/docs')->setLinkTarget('_blank');
    }
}
