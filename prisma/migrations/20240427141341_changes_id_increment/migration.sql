-- AlterTable
CREATE SEQUENCE passives_id_seq;
ALTER TABLE "Passives" ALTER COLUMN "id" SET DEFAULT nextval('passives_id_seq');
ALTER SEQUENCE passives_id_seq OWNED BY "Passives"."id";
