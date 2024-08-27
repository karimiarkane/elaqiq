/*
  Warnings:

  - The values [deleguation,vente] on the enum `Employee_workstation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `employee` MODIFY `workstation` ENUM('Sales', 'Delegue', 'DirecteurFinancier', 'Superviseur', 'Receptionist', 'FemmeDeMenage', 'Billetterie') NOT NULL;
