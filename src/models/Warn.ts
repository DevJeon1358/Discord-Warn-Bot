import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Warn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  did: string;

  @Column({ nullable: false })
  modDid: string;

  @Column({ nullable: false, default: 'Warned' })
  reason: string;
}

export default Warn;
