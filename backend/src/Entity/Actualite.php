<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ActualiteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ActualiteRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['actualite:list']]),
        new Get(normalizationContext: ['groups' => ['actualite:read']]),
    ],
    paginationItemsPerPage: 9,
    order: ['publishedAt' => 'DESC'],
)]
class Actualite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['actualite:list', 'actualite:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['actualite:list', 'actualite:read'])]
    private ?string $title = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['actualite:list', 'actualite:read'])]
    private ?string $slug = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['actualite:list', 'actualite:read'])]
    private ?string $excerpt = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['actualite:read'])]
    private ?string $content = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['actualite:list', 'actualite:read'])]
    private ?string $featuredImage = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['actualite:list', 'actualite:read'])]
    private ?string $category = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['actualite:list', 'actualite:read'])]
    private ?string $niveau = null;

    #[ORM\Column]
    #[Groups(['actualite:list', 'actualite:read'])]
    private bool $published = false;

    #[ORM\Column(nullable: true)]
    #[Groups(['actualite:list', 'actualite:read'])]
    private ?\DateTimeImmutable $publishedAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        if ($this->published && !$this->publishedAt) {
            $this->publishedAt = new \DateTimeImmutable();
        }
        if (!$this->slug) {
            $this->slug = $this->generateSlug($this->title);
        }
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    private function generateSlug(string $text): string
    {
        $text = strtolower(trim($text));
        $text = iconv('UTF-8', 'ASCII//TRANSLIT', $text);
        $text = preg_replace('/[^a-z0-9\-]/', '-', $text);
        return preg_replace('/-+/', '-', trim($text, '-'));
    }

    public function getId(): ?int { return $this->id; }
    public function getTitle(): ?string { return $this->title; }
    public function setTitle(string $title): static { $this->title = $title; return $this; }
    public function getSlug(): ?string { return $this->slug; }
    public function setSlug(string $slug): static { $this->slug = $slug; return $this; }
    public function getExcerpt(): ?string { return $this->excerpt; }
    public function setExcerpt(?string $excerpt): static { $this->excerpt = $excerpt; return $this; }
    public function getContent(): ?string { return $this->content; }
    public function setContent(?string $content): static { $this->content = $content; return $this; }
    public function getFeaturedImage(): ?string { return $this->featuredImage; }
    public function setFeaturedImage(?string $featuredImage): static { $this->featuredImage = $featuredImage; return $this; }
    public function getCategory(): ?string { return $this->category; }
    public function setCategory(?string $category): static { $this->category = $category; return $this; }
    public function getNiveau(): ?string { return $this->niveau; }
    public function setNiveau(?string $niveau): static { $this->niveau = $niveau; return $this; }
    public function isPublished(): bool { return $this->published; }
    public function setPublished(bool $published): static { $this->published = $published; return $this; }
    public function getPublishedAt(): ?\DateTimeImmutable { return $this->publishedAt; }
    public function setPublishedAt(?\DateTimeImmutable $publishedAt): static { $this->publishedAt = $publishedAt; return $this; }
    public function getCreatedAt(): ?\DateTimeImmutable { return $this->createdAt; }
    public function getUpdatedAt(): ?\DateTimeImmutable { return $this->updatedAt; }
}
