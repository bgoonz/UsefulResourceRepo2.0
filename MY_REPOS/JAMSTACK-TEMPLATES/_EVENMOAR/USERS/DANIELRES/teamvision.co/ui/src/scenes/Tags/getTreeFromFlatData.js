import { getTreeFromFlatData } from "react-sortable-tree";
import "react-sortable-tree/style.css";

export default ({ tags, taggings }) => {
  const flatData = tags.all.map(name => ({
    title: name,
    motivations: tags.metrics.motivations
      .filter(m => m.tag === name)
      .map(({ level, count }) => ({ level, count })),
    skills: tags.metrics.skills
      .filter(s => s.tag === name)
      .map(({ level, count }) => ({ level, count }))
  }));
  console.log({ flatData, motivations: tags.metrics.motivations });
  return getTreeFromFlatData({
    flatData,
    getKey: node => node.title,
    getParentKey: node => {
      const tagging = taggings.find(t => t.tgt === node.title);
      return tagging ? tagging.src : null;
    },
    rootKey: null
  });
};
