// Run this where you have access to your services array (e.g., Redux state)
const useGetNecessaryServiceDetails = (services) => {
  return services.map((s) => ({
    id: s.id || s._id,
    name: s.name,
    description: s.description?.substring(0, 100) + "...", // Keep it short
  }));
};

export default useGetNecessaryServiceDetails;
