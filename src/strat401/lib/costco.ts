/** Costco vs Sam's Club numbers (case exhibits) and derived figures. $ millions unless noted. */
export const COSTCO_FY25 = { netSales: 269912, fees: 5323, totalRevenue: 275235, merchCosts: 239886, sga: 24966, opIncome: 10383, netIncome: 8099 } // Ex.1
export const COSTCO_US_FY25 = { revenue: 200046, opIncome: 6878, warehouses: 629, sqftPerUnit: 147000, employees: 223000 } // Ex.2, Ex.4
export const SAMS_FY26 = { netSales: 93015, membershipOther: 2525, opIncome: 2442, clubs: 601, sqftThousands: 80502, employees: 100000 } // Ex.3, Ex.4

export const pct = (a: number, b: number) => a / b
export const costcoGrossMargin = () => pct(COSTCO_FY25.netSales - COSTCO_FY25.merchCosts, COSTCO_FY25.netSales) // 11.12%
export const costcoSgaRate = () => pct(COSTCO_FY25.sga, COSTCO_FY25.netSales) // 9.25%
export const costcoMerchSpread = () => COSTCO_FY25.netSales - COSTCO_FY25.merchCosts - COSTCO_FY25.sga // $5,060M
export const costcoFeeShareOfOI = () => pct(COSTCO_FY25.fees, COSTCO_FY25.opIncome) // ~51%
/** Sam's: operating income minus membership & other income = gross profit − operating expenses (Assignment Q2). */
export const samsMerchSpread = () => SAMS_FY26.opIncome - SAMS_FY26.membershipOther // −$83M
export const samsRevenue = () => SAMS_FY26.netSales + SAMS_FY26.membershipOther // $95,540M

export const perUnit = () => {
  const cRev = COSTCO_US_FY25.revenue / COSTCO_US_FY25.warehouses
  const sRev = samsRevenue() / SAMS_FY26.clubs
  const sSqft = (SAMS_FY26.sqftThousands * 1000) / SAMS_FY26.clubs
  return {
    costcoRevPerUnit: cRev, // 318.0
    samsRevPerUnit: sRev, // 159.0
    samsSqftPerUnit: sSqft, // 133,900
    costcoRevPerSqft: (cRev * 1e6) / COSTCO_US_FY25.sqftPerUnit, // ~2,164
    samsRevPerSqft: (samsRevenue() * 1e6) / (SAMS_FY26.sqftThousands * 1000), // 1,187
    costcoEmpPerUnit: COSTCO_US_FY25.employees / COSTCO_US_FY25.warehouses, // 355
    samsEmpPerUnit: SAMS_FY26.employees / SAMS_FY26.clubs, // 166
    costcoRevPerEmpK: (COSTCO_US_FY25.revenue * 1000) / COSTCO_US_FY25.employees, // 897
    samsRevPerEmpK: (samsRevenue() * 1000) / SAMS_FY26.employees, // 955
    costcoOIPerUnit: COSTCO_US_FY25.opIncome / COSTCO_US_FY25.warehouses, // 10.93
    samsOIPerUnit: SAMS_FY26.opIncome / SAMS_FY26.clubs, // 4.06
  }
}

/**
 * Split Costco's operating-income-per-box lead over Sam's into a VOLUME effect (Costco sells ~2× per box; valued at
 * Sam's margin) and a MARGIN effect (Costco's higher margin on its own revenue). Exact identity:
 * C_rev·C_m − S_rev·S_m = (C_rev − S_rev)·S_m + C_rev·(C_m − S_m).
 * Then the student assigns each effect to cost vs. differentiation with explicit, adjustable shares.
 */
export function decompose(volumeToDiff: number, marginToCost: number) {
  const u = perUnit()
  const cM = COSTCO_US_FY25.opIncome / COSTCO_US_FY25.revenue
  const sM = SAMS_FY26.opIncome / samsRevenue()
  const gap = u.costcoOIPerUnit - u.samsOIPerUnit
  const volume = (u.costcoRevPerUnit - u.samsRevPerUnit) * sM
  const margin = u.costcoRevPerUnit * (cM - sM)
  const diff = volume * volumeToDiff + margin * (1 - marginToCost)
  const cost = volume * (1 - volumeToDiff) + margin * marginToCost
  return { gap, volume, margin, cost, diff, costShare: cost / gap, diffShare: diff / gap, cM, sM }
}
