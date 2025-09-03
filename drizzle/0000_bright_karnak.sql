CREATE TABLE "Experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_exp" text,
	"institution_exp" text,
	"startDate_exp" text,
	"endDate_exp" text,
	"description_exp" text,
	"img_exp" text
);
--> statement-breakpoint
CREATE TABLE "Experiences_es" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_exp" text,
	"institution_exp" text,
	"startDate_exp" text,
	"endDate_exp" text,
	"description_exp" text,
	"img_exp" text
);
--> statement-breakpoint
CREATE TABLE "Proyects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_pro" text,
	"technologies_pro" text,
	"description_pro" text,
	"deployLink_pro" text,
	"githubLink_pro" text,
	"img1_pro" text,
	"img2_pro" text,
	"img3_pro" text
);
--> statement-breakpoint
CREATE TABLE "Proyects_es" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_pro" text,
	"technologies_pro" text,
	"description_pro" text,
	"deployLink_pro" text,
	"githubLink_pro" text,
	"img1_pro" text,
	"img2_pro" text,
	"img3_pro" text
);
--> statement-breakpoint
CREATE TABLE "Skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text,
	"img_skill" text,
	"name" text,
	"amount" integer
);
--> statement-breakpoint
CREATE TABLE "SocialMedia" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"img" text,
	"url" text
);
--> statement-breakpoint
CREATE TABLE "UserPhrases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"main_phrase" text,
	"phrase1" text,
	"phrase2" text,
	"phrase3" text
);
--> statement-breakpoint
CREATE TABLE "UserPhrases_es" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"main_phrase" text,
	"phrase1" text,
	"phrase2" text,
	"phrase3" text
);
