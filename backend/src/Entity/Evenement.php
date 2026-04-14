<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\EvenementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EvenementRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['evenement:list']]),
        new Get(normalizationContext: ['groups' => ['evenement:read']]),
    ],
    paginationItemsPerPage: 10,
    order: ['eventDate' => 'ASC'],
)]
class Evenement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['evenement:list', 'evenement:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['evenement:list', 'evenement:read'])]
    private ?string $title = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['evenement:list', 'evenement:read'])]
    private ?string $slug = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['evenement:read'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Assert\NotNull]
    #[Groups(['evenement:list', 'evenement:read'])]
    private ?\DateTimeImmutable $eventDate = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['evenement:list', 'evenement:read'])]
    private ?string $eventTime = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['evenement:list', 'evenement:read'])]
    private ?string $location = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['evenement:list', 'evenement:read'])]
    private ?string $type = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['evenement:list', 'evenement:read'])]
    private ?string $etablissement = null;

    #[ORM\Column]
    private bool $published = true;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->createdAt = new \DateTimeImmutable();
        if (!$this->slug && $this->title) {
            $this->slug = $this->generateSlug($this->title . '-' . ($this->eventDate?->format('Y-m-d') ?? ''));
        }
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
    public function getDescription(): ?string { return $this->description; }
    public function setDescription(?string $description): static { $this->description = $description; return $this; }
    public function getEventDate(): ?\DateTimeImmutable { return $this->eventDate; }
    public function setEventDate(\DateTimeImmutable $eventDate): static { $this->eventDate = $eventDate; return $this; }
    public function getEventTime(): ?string { return $this->eventTime; }
    public function setEventTime(?string $eventTime): static { $this->eventTime = $eventTime; return $this; }
    public function getLocation(): ?string { return $this->location; }
    public function setLocation(?string $location): static { $this->location = $location; return $this; }
    public function getType(): ?string { return $this->type; }
    public function setType(?string $type): static { $this->type = $type; return $this; }
    public function getEtablissement(): ?string { return $this->etablissement; }
    public function setEtablissement(?string $etablissement): static { $this->etablissement = $etablissement; return $this; }
    public function isPublished(): bool { return $this->published; }
    public function setPublished(bool $published): static { $this->published = $published; return $this; }
    public function getCreatedAt(): ?\DateTimeImmutable { return $this->createdAt; }
}
