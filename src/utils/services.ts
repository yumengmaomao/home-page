import fs from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';

import type { Service } from 'src/types/services';

const filePath = process.env.FILE_PATH ? tmpdir() + process.env.FILE_PATH : `${path.resolve()}/services.json`;

export const getServicesData = async () => {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(data) as Service[];
  } catch {
    return [];
  }
};

export const addServicesData = async (service: Service) => {
  const servicesData = await getServicesData();
  servicesData.push(service);

  await fs.writeFile(filePath, JSON.stringify(servicesData, null, 2));
};

export const delServicesData = async (target: string) => {
  const servicesData = await getServicesData();
  const newData = servicesData.filter(service => service.name !== target);

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};

export const editServiceData = async (service: Service & { oldName: string }) => {
  const servicesData = await getServicesData();
  const newData = servicesData.map((item) => {
    return item.name === service.oldName ? service : item;
  });

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};
