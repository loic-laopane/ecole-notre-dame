<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\EtablissementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EtablissementRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['etab:list']]),
        new Get(normalizationContext: ['groups' => ['etab:read']]),
    ],
    order: ['position' => 'ASC'],
    paginationEnabled: false,
)]
class Etablissement
{
    public const NIVEAU_MATERNELLE  = 'maternelle';
    public const NIVEAU_ELEMENTAIRE = 'elementaire';
    public const NIVEAU_COLLEGE     = 'college';
    public const NIVEAU_LYCEE       = 'lycee';

    public const NIVEAUX = [
        'Maternelle'  => self::NIVEAU_MATERNELLE,
        'Élémentaire' => self::NIVEAU_ELEMENTAIRE,
        'Collège'     => self::NIVEAU_COLLEGE,
        'Lycée'       => self::NIVEAU_LYCEE,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['etab:list', 'etab:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $slug = null;

    #[ORM\Column(length: 50)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $niveau = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $excerpt = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['etab:read'])]
    private ?string $content = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $address = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $city = null;

    #[ORM\Column(length: 20, nullable: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $email = null;

    #[ORM\Column(length: 10, nullable: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $colorDot = null;

    #[ORM\Column(length: 10, nullable: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $icon = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['etab:list', 'etab:read'])]
    private ?string $featuredImage = null;

    #[ORM\Column(options: ['default' => 0])]
    #[Groups(['etab:list'])]
    private int $position = 0;

    public function getId(): ?int { return $this->id; }
    public function getName(): ?string { return $this->name; }
    public function setName(string $name): static { $this->name = $name; return $this; }
    public function getSlug(): ?string { return $this->slug; }
    public function setSlug(string $slug): static { $this->slug = $slug; return $this; }
    public function getNiveau(): ?string { return $this->niveau; }
    public function setNiveau(string $niveau): static { $this->niveau = $niveau; return $this; }
    public function getExcerpt(): ?string { return $this->excerpt; }
    public function setExcerpt(?string $excerpt): static { $this->excerpt = $excerpt; return $this; }
    public function getContent(): ?string { return $this->content; }
    public function setContent(?string $content): static { $this->content = $content; return $this; }
    public function getAddress(): ?string { return $this->address; }
    public function setAddress(?string $address): static { $this->address = $address; return $this; }
    public function getCity(): ?string { return $this->city; }
    public function setCity(?string $city): static { $this->city = $city; return $this; }
    public function getPhone(): ?string { return $this->phone; }
    public function setPhone(?string $phone): static { $this->phone = $phone; return $this; }
    public function getEmail(): ?string { return $this->email; }
    public function setEmail(?string $email): static { $this->email = $email; return $this; }
    public function getColorDot(): ?string { return $this->colorDot; }
    public function setColorDot(?string $colorDot): static { $this->colorDot = $colorDot; return $this; }
    public function getIcon(): ?string { return $this->icon; }
    public function setIcon(?string $icon): static { $this->icon = $icon; return $this; }
    public function getFeaturedImage(): ?string { return $this->featuredImage; }
    public function setFeaturedImage(?string $featuredImage): static { $this->featuredImage = $featuredImage; return $this; }
    public function getPosition(): int { return $this->position; }
    public function setPosition(int $position): static { $this->position = $position; return $this; }
}
