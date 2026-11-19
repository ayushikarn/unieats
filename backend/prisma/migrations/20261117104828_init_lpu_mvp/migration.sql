-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'FACULTY', 'ADMIN');

-- CreateEnum
CREATE TYPE "DietaryType" AS ENUM ('ANY', 'VEGETARIAN', 'VEGAN', 'NON_VEGETARIAN', 'EGLUTEN_FREE');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'OUT_OF_STOCK', 'TEMPORARILY_CLOSED');

-- CreateTable
CREATE TABLE "Campus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "budget" DECIMAL(65,30),
    "mood" TEXT,
    "dietary_pref" TEXT,
    "eating_habits" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "campus_id" INTEGER NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "rating" DECIMAL(65,30) DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodItem" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "dietary_type" "DietaryType" NOT NULL DEFAULT 'ANY',
    "availability" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FoodTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodItemFoodTag" (
    "food_item_id" INTEGER NOT NULL,
    "food_tag_id" INTEGER NOT NULL,

    CONSTRAINT "FoodItemFoodTag_pkey" PRIMARY KEY ("food_item_id","food_tag_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "food_item_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "food_item_id" INTEGER NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campus_name_key" ON "Campus"("name");

-- CreateIndex
CREATE INDEX "Campus_name_idx" ON "Campus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_user_id_key" ON "UserPreference"("user_id");

-- CreateIndex
CREATE INDEX "UserPreference_user_id_idx" ON "UserPreference"("user_id");

-- CreateIndex
CREATE INDEX "Restaurant_campus_id_idx" ON "Restaurant"("campus_id");

-- CreateIndex
CREATE INDEX "Restaurant_name_idx" ON "Restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "FoodItem_restaurant_id_idx" ON "FoodItem"("restaurant_id");

-- CreateIndex
CREATE INDEX "FoodItem_category_id_idx" ON "FoodItem"("category_id");

-- CreateIndex
CREATE INDEX "FoodItem_name_idx" ON "FoodItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTag_name_key" ON "FoodTag"("name");

-- CreateIndex
CREATE INDEX "FoodTag_name_idx" ON "FoodTag"("name");

-- CreateIndex
CREATE INDEX "FoodItemFoodTag_food_tag_id_idx" ON "FoodItemFoodTag"("food_tag_id");

-- CreateIndex
CREATE INDEX "Review_food_item_id_idx" ON "Review"("food_item_id");

-- CreateIndex
CREATE INDEX "Review_user_id_idx" ON "Review"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_user_id_food_item_id_key" ON "Review"("user_id", "food_item_id");

-- CreateIndex
CREATE INDEX "Recommendation_user_id_idx" ON "Recommendation"("user_id");

-- CreateIndex
CREATE INDEX "Recommendation_food_item_id_idx" ON "Recommendation"("food_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_user_id_food_item_id_key" ON "Recommendation"("user_id", "food_item_id");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItem" ADD CONSTRAINT "FoodItem_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItem" ADD CONSTRAINT "FoodItem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItemFoodTag" ADD CONSTRAINT "FoodItemFoodTag_food_item_id_fkey" FOREIGN KEY ("food_item_id") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItemFoodTag" ADD CONSTRAINT "FoodItemFoodTag_food_tag_id_fkey" FOREIGN KEY ("food_tag_id") REFERENCES "FoodTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_food_item_id_fkey" FOREIGN KEY ("food_item_id") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_food_item_id_fkey" FOREIGN KEY ("food_item_id") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
